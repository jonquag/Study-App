const mongoose = require('mongoose');
const { Schema } = mongoose;

const ForumSchema = new Schema({
    
    // user creating the forum
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
