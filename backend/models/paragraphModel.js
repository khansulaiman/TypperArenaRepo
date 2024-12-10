const mongoose = require('mongoose');

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
        default: null,
    },
    typing_duration: {
        type: Number,
        default: 0, // Typing duration in seconds
    },
    difficulty_level: { // Fixed spelling from `dificulty_level`
        type: String,
        required: true,
        default: 'easy',
        enum: ['easy', 'medium', 'hard'],
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

const Paragraph = mongoose.model('Paragraph', paragraphSchema);

module.exports = Paragraph;
