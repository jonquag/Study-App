const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');

exports.saveMessage = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {message} = data;
            message['profile'] = mongoose.Types.ObjectId(message.profile);
            const d = new Date();
            const nowTime = Math.floor(d.getTime() / 1000);
            message['timeStamp'] = nowTime;
            await Conversation.updateOne(
                { group: data.room },
                { $push: { messages: message}},
            );
    
            const conversation = await Conversation.find(
                { group: data.room }, 
                { messages: {$slice: -1} }
            ).populate({
                path: 'messages',
                populate: {
                    path: 'profile',
                    model: 'Profile',
                    select: ['imageUrl', 'user']
                }
            });
            if (!conversation) throw new Error('Failed to find message.')
            resolve(conversation[0].messages[0])
        } catch (err) {
            reject(err);
        }
    });
};
