const Conversation = require('../models/Conversation');

exports.saveMessage = async (data) => {
    return new Promise(async (resolve, reject) => {
        
        const {message} = data;
        const d = new Date();
        const nowTime = Math.floor(d.getTime() / 1000);
        message['timeStamp'] = nowTime;
        const conversation = await Conversation.findOne({ group: data.room });
        if (!conversation) reject('No conversation found.');

        conversation.messages.push(message);

        const c = await conversation.save();
        if (!c) reject('Failed to update conversation.');

        resolve(c.messages[c.messages.length - 1]);
    });
};
