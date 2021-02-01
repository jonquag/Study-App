const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConversationSchema = new Schema({
    // group information
    group: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Group',
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    // individual message information
    messages: [
        {
            user: { type: Schema.Types.ObjectId },
            dateCreated: {
                type: Date,
                default: Date.now,
            },
            text: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model('Conversation', ConversationSchema);
