const mongoose = require('mongoose');

const setTestTypeSchema = new mongoose.Schema({
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
    created_at: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    }
});

const TestType = mongoose.model('test_type', setTestTypeSchema);

module.exports = TestType;
