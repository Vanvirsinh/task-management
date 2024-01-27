const mongoose = require('mongoose');
const { getDate } = require('../utils/date');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: String,
        default: getDate()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
