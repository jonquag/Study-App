const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    posts: [
        {
            // user creating this specific post
            user: {
                type: Schema.Types.ObjectId,
            },
            avatar: {
                type: String,
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
            date: {
                type: Date,
                default: Date.now,
            },
            comments: [
                {
                    // user creating this specific comment
                    user: { type: Schema.Types.ObjectId },
                    text: { type: String, required: true },
                    name: { type: String },
                    avatar: { type: String },
                    votes: [
                        {
                            user: { type: Schema.Types.ObjectId },
                        },
                    ],
                    date: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
        },
    ],
});

module.exports = mongoose.model('Post', PostSchema);
