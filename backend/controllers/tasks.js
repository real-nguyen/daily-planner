const Task = require('../models/task');
const TaskType = require('../models/task-type');

exports.fetchTasks = (req, res, next) => {
  TaskType.find().or([{ type: 'Priority' }, { type: 'Recurrent' }]).then(types => {
    const priority = types[0];
    const recurrent = types[1];
    // Get priority and recurrent tasks
    // sort by hours required, descending
    // group by task type
    Task.aggregate()
    .match({ $or: [{type: priority._id}, {type: recurrent._id}] })
    .sort({ hoursRequired: -1 })
    .group({
      _id: '$type',
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
      console.log(result);
      res.status(200).json({
        tasks: result
      });
    });
  })
};
