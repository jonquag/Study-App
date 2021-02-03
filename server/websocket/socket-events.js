const verifyToken = require('../utils/verifyToken');
const roomController = require('../controllers/rooms');
const connectedUsers = {}

module.exports = function (io) {
    io.use((socket, next) => {
        verifyToken(socket, next);
    });
    io.on("connection", async (socket) => {
        //await roomController.joinRooms(socket);
        socket.join('6019f50fec5ce9f1a8963e53');
        
        connectedUsers[socket.uid] = socket.id;
        console.log("user " + socket.uid + " connected to socket server");

        socket.on("joinRoom", () => {
            console.log("join room");
        });
        socket.on("leaveRoom", () => {
            console.log("leave room");
        });
        socket.on("messageGroup", (data) => {
            //console.log('hello: ', socket, data)
            //socket.emit('message', data)
            console.log(data.room)
            io.to(data.room).emit('group message', data)
            //socket.emit('group message', data)
            //io.to(data.room).emit('message', data);
        });
        socket.on("disconnect", () => {
            delete connectedUsers[socket.uid]
            console.log("disconnected user ", socket.uid)
        })
    });
    io.on("error", (err) => {
        console.log('Connection Failed: ', err);
    });
}