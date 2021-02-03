const Conversation = require('../models/Conversation');

exports.saveMessage = async (data) => {
    return new Promise(async (resolve, reject) => {
        
        const {message} = data;
        const d = new Date();
        const nowTime = Math.floor(d.getTime() / 1000);
        message['timeStamp'] = nowTime;
        console.log(nowTime)
        const conversation = await Conversation.findOne({ group: data.room });
        console.log(conversation)
        conversation.messages.push(message)

        const c = await conversation.save();

        resolve(c.messages[c.messages.length - 1]);
    });
};

exports.sendMsgToRoom = async (socket) => {

};
