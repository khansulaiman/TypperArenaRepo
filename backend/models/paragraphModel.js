const { content } = require('googleapis/build/src/apis/content');
const mongoose    = require('mongoose');

const paragraphSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    content: {
        type: String,
        required: true,
    },

    contest_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contests',
        required: true,
    },

    dificulty_level: {
        type:String,
        required: true,
        default: 'easy',
        enum: ['easy', 'medium', 'hard'],
    },

    updated_at: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    },

    created_at: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    },
});

const paragraphs = mongoose.model('paragraph', paragraphSchema);

module.exports = paragraphs;
