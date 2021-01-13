const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");

router.post("/", async function(req, res) {
  const {email, password} = req.body;
  if (!email | !password || !isValidPassword(password)) {
    res.status(400).send({ response: "Missing or invalid field(s)" });
  } else {
      bcrypt.hash(password, 10, (err, hashedPw) => {
        if (err) {
          res.status(500).send();
        } else {
          const user = new User({email, password: hashedPw});
          user.save(function (err, userDoc) {
            if (err) {
              if (!err.errors || err.errors.email && err.errors.email.reason) {
                res.status(500).send(); //Internal error connecting with MongoDB 
              } else {
                res.send(409).send(); //Email conflict with existing user
              }
            } else {
              const token = jwt.sign(
                { id: userDoc.id },
                process.env.SECRET_KEY,
                { expiresIn: "180d" },
              );
              res.cookie("token", token, { httpOnly: true });
              res.status(201).send();
            }
          });
        }
      });
    }
});

function isValidPassword(pw) {
  return pw.length > 6;
};

module.exports = router;
