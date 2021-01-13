const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    return res.status(401).json({ response: "Auth failed" });
  }
};
