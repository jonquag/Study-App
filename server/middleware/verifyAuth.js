const { Unauthorized } = require('../utils/errors');
const jwt = require("jsonwebtoken");

module.exports = [(req, res, next) => {
  try {
    const token = req.cookies.token;
    jwt.verify(token, process.env.SECRET_KEY);
    const decoded = jwt.decode(token);
    req.body.userId = decoded.id;
    next();
  } catch (err) {
    next(new Unauthorized("Auth failed"));
  }
}, ];
