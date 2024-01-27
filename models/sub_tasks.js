const mongoose = require('mongoose');
const { getDate } = require('../utils/date');

const subtaskSchema = new mongoose.Schema({
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        enum: [0, 1],
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

const Subtask = mongoose.model('Subtask', subtaskSchema);

module.exports = Subtask;
