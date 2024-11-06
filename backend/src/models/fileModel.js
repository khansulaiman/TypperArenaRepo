const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    file_path: {
        type: String,
        required: true,
    },
    uploaded_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    related_course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true,
    },
    status: {
        type: Number,
        enum: [0, 1], // 0 means inactive and 1 means active
        required: true,
    },
    entry_time: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    }
});

const File = mongoose.model('file', fileSchema);

module.exports = File;
