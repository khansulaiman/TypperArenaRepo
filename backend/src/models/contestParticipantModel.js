const mongoose = require('mongoose');

const contestParticipant = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    contest_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contests',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    refundable: {
        type: Boolean,
        required: true,
    },
    status: {
        type: Number,
        enum : [0, 1],
        required: true,
    },
    joined_at: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    }
});

const contest_participant = mongoose.model('contest_participant', contestParticipant);

module.exports = contest_participant;
