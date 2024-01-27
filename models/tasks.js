const mongoose = require('mongoose');
const { getDate } = require('../utils/date');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO',
  },
  priority: {
    type: Number,
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: String,
    default: getDate
  },
  updated_at: {
    type: String,
    default: getDate
  },
  deleted_at: {
    type: String
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
