const mongoose = require('mongoose');
const { Schema } = mongoose;

const ForumSchema = new Schema({
    // name of the forum
    name: {
        type: String,
        required: true,
        ref: 'User',
    },

    // user creating the forum
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Forum', ForumSchema);
