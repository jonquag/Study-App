const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");

router.post("/", async function(req, res) {
  const {name, email, password} = req.body;
  if (!name || !email | !password || !isValidPassword(password)) {
    res.status(400).send({ response: "Missing or invalid field(s)"});
  } else {
    const exists = await emailExists(email);
    if (exists) {
      res.status(409).send(); //Conflict with existing email
    } else {
      bcrypt.hash(password, 10, (err, hashedPw) => {
        if (err) {
          res.status(500).send()
        } else {
          const user = new User({name, email, password: hashedPw});
          user.save(function (err, userDoc) {
            if (err) {
                res.status(500).send() //Not a problem with user info (already verified)
            } else {
              const token = jwt.sign(
                { id: userDoc.id },
                process.env.SECRET_KEY,
                { expiresIn: "180d" },
              );
              res.cookie("token", token, { httpOnly: true });
              res.status(201).send()
            }
          });
        }
      });
    }
  }
});

//Check if user with email alrady exists
async function emailExists(email) {
  const existingUser = await User.findOne({email});
  return existingUser != null;
};

function isValidPassword(pw) {
  return pw.length > 6;
};

module.exports = router;
