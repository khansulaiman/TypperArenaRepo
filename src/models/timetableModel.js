const mongoose = require('mongoose');

const timeTables = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },

    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class',
        required: true,
    }, 

    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },

    day: {
        type: String,
        required: true,
    },

    start_time: {
        type: String,
        required: true,
    },

    end_time: {
        type: String,
        required: true,
    },

    entry_time: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    }
});

const timeTable = mongoose.model('timetable', timeTables);

module.exports = timeTable;
