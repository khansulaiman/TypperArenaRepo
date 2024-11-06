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
    user_verify:{
        type: Boolean,
        default: false,
    },
   online_status:{
        type: Boolean,
        default: false
    },
    gender:{
        type: String,
        enum: ['Male', 'Female', 'Others'],
        default: 'Male',
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


const User     = mongoose.model('users', userSchema);

module.exports = User;
