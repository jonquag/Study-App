const verifyToken = require('../utils/verifyToken');

const connectedUsers = {}

module.exports = function (io) {
    io.use((socket, next) => {
        verifyToken(socket, next);
    });
    io.on("connection", (socket) => {

        connectedUsers[socket.uid] = socket.id;
        console.log("user " + socket.uid + " connected to socket server");

        socket.on("disconnect", () => {
            delete connectedUsers[socket.uid]
            console.log("disconnected user ", socket.uid)
        })
    });
    io.on("error", (err) => {
        console.log('Connection Failed: ', err);
    });
}