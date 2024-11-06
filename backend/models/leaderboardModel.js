const mongoose = require('mongoose');

const leaderboard = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    position: {
        type: Number,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    created_at: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    }
});

const Leaderboard = mongoose.model('leaderboard', leaderboard);

module.exports = Leaderboard;
