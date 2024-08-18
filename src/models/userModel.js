const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    updated_at: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    },
    created_at: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    }

}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });


const User = mongoose.model('users', userSchema);

module.exports = User;
