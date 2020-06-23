const Task = require('../models/task');

exports.fetchTasks = (req, res, next) => {
  // Join with TaskType schema on Type.type == TaskType._id
  // Filter out free time tasks
  // Get priority and recurrent tasks
  // Sort by hours required, descending
  // Group by task type
  Task.aggregate()
  .lookup({
    from: 'tasktypes',
      let: { type_id: '$type' },
      pipeline: [{
        $match: {
          $expr: {
            $and: [
              { $eq: ['$$type_id', '$_id'] },
              { $not: { $eq: ['$type', 'Free Time'] } }
            ]
          }
        }
      }],
      as: 'type'
  })
  // Type.type is returned as an array after lookup; unpack it
  .unwind({ path: '$type' })
  .sort({ hoursRequired: -1 })
  .group({
    _id: '$type.type',
    tasks: {
      $push: {
        _id: '$_id',
        task: '$task',
        type: '$type',
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
