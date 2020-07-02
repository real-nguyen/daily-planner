const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  task: { type: String, required: true },
  // Types: priority, recurrent, free-time
  type: { type: String, required: true },
  done: { type: Boolean },
  hoursRequired: { type: Number },
  note: { type: String }
});

module.exports = mongoose.model('Task', taskSchema);
