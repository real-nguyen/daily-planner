const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
  goal: { type: String, required: true },
  done: { type: Boolean, required: true }
});

module.exports = mongoose.model('Goal', goalSchema);
