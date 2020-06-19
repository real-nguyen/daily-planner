const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  task: { type: String, required: true },
  // Types: Priority, Recurrent, Free Time
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskType', required: true },
  done: { type: Boolean },
  hoursRequired: { type: Number }
});

module.exports = mongoose.model('Task', taskSchema);
