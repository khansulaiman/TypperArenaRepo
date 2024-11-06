const mongoose = require('mongoose');

const UserPermissionCollection = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'arena_users',
        required: true
    },
    module_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'modules',
        required: true
    },
    permission_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'permissions',
        required: true
    },
    created_at: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    }
});

const UserPermissionModel = mongoose.model('user_permissions', UserPermissionCollection);

module.exports = UserPermissionModel;
