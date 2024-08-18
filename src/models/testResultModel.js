const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users', // Assuming you have a User model
    },
    test_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'test_types', // Assuming you have a TestType model
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
        type: Date,
        default: Date.now,
    },
});

const TestResult = mongoose.model('test_result', testResultSchema);

module.exports = TestResult;
