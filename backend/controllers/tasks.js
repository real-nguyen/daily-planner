const Task = require('../models/task');

exports.fetchTasks = (req, res, next) => {
  // Filter out free time tasks
  // Get priority and recurrent tasks
  // Sort by hours required, descending
  // Group by task type
  Task.aggregate()
  .match({
    $expr: {
      $not: { $eq: ['$type', 'free-time'] }
    }
  })
  .sort({ hoursRequired: -1 })
  .group({
    _id: '$type',
    tasks: {
      $push: {
        _id: '$_id',
        task: '$task',
        type: '$type',
        done: '$done',
        hoursRequired: '$hoursRequired',
        note: '$note'
      }
    }
  })
  .then(result => {
    const priorityTasks = result.find(t => t._id == 'priority');
    const recurrentTasks = result.find(t => t._id == 'recurrent');
    res.status(200).json({
      priorityTasks: priorityTasks,
      recurrentTasks: recurrentTasks
    });
  });
};

exports.fetchFreeTimeTasks = (req, res, next) => {
  Task.find({ type: 'free-time' })
  .then(result => {
    res.status(200).json({
      freeTimeTasks: result
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Could not fetch Free Time tasks.'
    });
  });
}

exports.addTask = (req, res, next) => {
  const task = new Task({
    task: req.body.task,
    type: req.body.type,
    done: req.body.done,
    hoursRequired: req.body.hoursRequired,
    note: req.body.note
  });
  task.save().then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Task added.'
    });
  });
};

exports.markDone = (req, res, next) => {
  Task.updateOne({ _id: req.params.id }, { done: req.body.done })
  .then(result => {
    if (result.n > 0) {
      const message = req.body.done ? 'Marked task as done.' : 'Marked task as not done.';
      console.log(message);
      res.status(200).json({message: message});
    } else {
      console.log('Could not update task.');
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Could not update task:' + error
    });
  });
};

exports.updateTask = (req, res, next) => {
  // Returns the updated task
  Task.findOneAndUpdate({ _id: req.params.id }, req.body.task, { new: true })
  .then(result => {
    console.log(result);
    console.log('Task updated.');
    res.status(200).json({message: 'Task updated.'});
  })
  .catch(error => {
    res.status(500).json({
      message: 'Could not update task: ' + error
    })
  });
};

exports.deleteTask = (req, res, next) => {
  Task.deleteOne({ _id: req.params.id })
  .then(result => {
    console.log(result);
    if (result.n > 0) {
      console.log('Task deleted.');
      res.status(200).json({message: 'Task deleted.'});
    } else {
      console.log('Could not delete task.');
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Could not delete task: ' + error
    });
  });
};

