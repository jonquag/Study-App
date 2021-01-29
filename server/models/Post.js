const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    // user creating this specific post
    user: {
        type: Schema.Types.ObjectId,
    },
    name: {
        type: String,
    },
    postAvatar: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    votes: [
        {
            user: { type: Schema.Types.ObjectId },
        },
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Post', PostSchema);
