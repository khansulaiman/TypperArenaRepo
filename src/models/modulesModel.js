const mongoose = require('mongoose');

const ModulesCollection = new mongoose.Schema({
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

const Modules = mongoose.model('modules', ModulesCollection);

module.exports = Modules;
