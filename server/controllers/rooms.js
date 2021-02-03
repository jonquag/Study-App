const User = require('../models/user');

exports.joinRooms = async (socket) => {
    const user = await User.findById(socket.uid);
    console.log(user.groups)
    await socket.join([...user.groups]);
    console.log(socket.rooms)
};

exports.sendMsgToRoom = async (socket) => {

};
