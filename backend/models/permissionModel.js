const mongoose = require('mongoose');

const PermissionCollection = new mongoose.Schema({
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

const PermissionModel = mongoose.model('permissions', PermissionCollection);

module.exports = PermissionModel;
