const mongoose = require('mongoose');

const difficalutyLevelSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    content: {
        type: String,
        required: true,
    },
    difficalty_level_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'difficalty_level',
        required: true,
    },
});

const TestType = mongoose.model('difficalty_level', difficalutyLevelSchema);

module.exports = TestType;
