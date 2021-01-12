const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", async function(req, res) {
  const {email, password} = req.body;
  if (!email || !password) {
    res.status(400).send({ response: "Missing required field(s) "});
  } else {
    const user = await User.findOne({email});
    if (user == null) {
      res.status(404).send({ response: "Cannot find user"});
    } else {
      try {
        if (await bcrypt.compare(password, user.password)) {
            res.status(200).send();
        } else {
            res.status(403).send({response: "Invalid credentials"});
        }
      } catch {
        res.status(500).send();
      }
    }
  }
});

module.exports = router;
