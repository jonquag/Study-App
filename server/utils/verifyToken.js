const cookie = require('cookie');
const jwt = require("jsonwebtoken");

const verifyToken = (socket, next) => {
    try {
        const cookies = cookie.parse(socket.handshake.headers.cookie || '');
        jwt.verify(cookies.token, process.env.SECRET_KEY);
        const decoded = jwt.decode(cookies.token);
        socket["uid"] = decoded.id
        next();
    } catch (err) {
        next(new Error("Auth failed"));
    }
}

module.exports = verifyToken;