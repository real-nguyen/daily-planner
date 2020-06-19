const Task = require('../models/task');
const TaskType = require('../models/task-type');

exports.fetchTasks = (req, res, next) => {
  TaskType.find().or([ { type: "Priority" }, { type: "Recurrent" } ]).then(types => {
    const priority = types[0];
    const recurrent = types[1];
    Task.find().or([{ type: priority._id }, { type: recurrent._id }]).then(result => {
      res.status(200).json({
        tasks: result
      });
    });
  })
};
