const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users', // Assuming you have a User model
    },
    contest_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'contests', // Assuming you have a TestType model
    },
    paragraph_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'paragraphs', // Assuming you have a Paragraph model
    },
    wpm: {
        type: Number,
        required: true,
    },
    accuracy: {
        type: Number,
        required: true,
    },
    raw: {
        type: Number,
        required: true,
    },
    characters: {
        type: Number,
        required: true,
    },
    consistency: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    demography: {
        type: String,
        required: true,
        maxlength: 255,
    },
    created_at: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000)
    },
});

const TestResult = mongoose.model('test_result', testResultSchema);

module.exports = TestResult;
