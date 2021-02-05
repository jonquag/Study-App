const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConversationSchema = new Schema({
    // group information
    group: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Group',
    },
    // individual message information
    messages: [
        {
            profile: {
                type: Schema.Types.ObjectId,
                ref: 'Profile',
                required: true
            },
            timeStamp: {
                type: Number,
            },
            text: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model('Conversation', ConversationSchema);
