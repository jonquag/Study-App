const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    // user creating this specific comment
    user: {
        type: Schema.Types.ObjectId,
    },
    text: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    votes: [
        {
            user: { type: Schema.Types.ObjectId },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', CommentSchema);
