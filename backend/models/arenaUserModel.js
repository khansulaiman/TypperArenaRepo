const mongoose = require('mongoose');

const arenauserSchema = new mongoose.Schema({

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
   online_status:{
        type: Boolean,
        default: false
    },
    gender:{
        type: String,
        enum: ['Male', 'Female', 'Others'],
        default: 'Male',
    },
    user_type:{
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
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


const User     = mongoose.model('arena_users', arenauserSchema);

module.exports = User;
