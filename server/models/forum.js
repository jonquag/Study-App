const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumSchema = new Schema({
    // name of the forum
    name: { type: String, required: true },

    // user creating the forum
    user: {
        type: Schema.Types.ObjectId,
    },

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

            comments: [
                {
                    // user creating this specific comment
                    user: { type: Schema.Types.ObjectId },
                    text: { type: String, required: true },
                    name: { type: String },
                    avatar: { type: String },
                    date: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
        },
    ],
});

module.exports = mongoose.model('Forum', forumSchema);
