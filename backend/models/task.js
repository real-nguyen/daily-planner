const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  task: { type: String, required: true },
  // Types: Priority, Recurrent, Free Time
  type: { type: String, required: true },
  color: { type: String },
  done: { type: Boolean },
  hoursRequired: { type: Number },
  note: { type: String }
});

module.exports = mongoose.model('Task', taskSchema);
