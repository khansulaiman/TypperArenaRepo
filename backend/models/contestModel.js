const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
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
    is_paid: {
        type: Boolean,
        required: true,
    },
    fee: {
        type: Number,
        default: 0,
        // required: true,
    },
    start_date: {
        type: Number,
        required: true,
    },
    end_date: {
        type: Number,
        required: true,
    },
    entry_time: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    }
});

const Contest = mongoose.model('contest', contestSchema);

module.exports = Contest;
