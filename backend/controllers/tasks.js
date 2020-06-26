const Task = require('../models/task');

exports.fetchTasks = (req, res, next) => {
  // Join with TaskType schema on Type.type == TaskType._id
  // Filter out free time tasks
  // Get priority and recurrent tasks
  // Sort by hours required, descending
  // Group by task type
  Task.aggregate()
  .match({
    $expr: {
      $not: { $eq: ['$type', 'Free Time'] }
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
        color: '$color',
        done: '$done',
        hoursRequired: '$hoursRequired'
      }
    }
  })
  .then(result => {
    const priorityTasks = result.find(t => t._id == 'Priority');
    const recurrentTasks = result.find(t => t._id == 'Recurrent');
    res.status(200).json({
      priorityTasks: priorityTasks,
      recurrentTasks, recurrentTasks
    });
  });
};

exports.markDone = (req, res, next) => {
  Task.updateOne({ _id: req.params.id }, { done: req.body.done })
  .then(result => {
    if (result.n > 0) {
      console.log('Task updated.');
      res.status(200).json({message: 'Task updated.'});
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

exports.addTask = (req, res, next) => {
  const task = new Task({
    task: req.body.task,
    type: req.body.type,
    color: req.body.color,
    done: req.body.done,
    hoursRequired: req.body.hoursRequired
  });
  task.save().then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Task added.'
    });
  });
};
