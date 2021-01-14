const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");

router.post("/", async function(req, res) {
  const {email, password} = req.body;
  const hashedPw = await bcrypt.hash(password, 10)
  .catch(() => {
        res.sendStatus(500).send();
  });
  if (hashedPw) {
    const user = new User({ email, password: hashedPw });
    const userDoc = await user.save()
    .catch((err) => {
      if (!err.errors || err.errors.email && err.errors.email.reason) {
        res.sendStatus(500); //Internal error connecting with MongoDB 
      } else {
        res.sendStatus(409); //Email conflict with existing user
      }
    });
    if (userDoc) {
      const token = jwt.sign(
        { id: userDoc.id },
        process.env.SECRET_KEY,
        { expiresIn: "180d" },
      );
      res.cookie("token", token, { httpOnly: true });
      res.sendStatus(201);
    }
  }
});

module.exports = router;
