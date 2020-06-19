const mongoose = require('mongoose');

const taskTypeSchema = mongoose.Schema({
  type: {type: String},
  color: {type: String}
});

module.exports = mongoose.model('TaskType', taskTypeSchema);
