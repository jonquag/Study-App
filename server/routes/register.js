const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { GeneralError } = require('../utils/errors');
const router = express.Router();

const User = require("../models/user");
const Profile = require("../models/profile")

router.post("/", async function(req, res) {
  const {email, password} = req.body;
  const hashedPw = await bcrypt.hash(password, 10)
  .catch(() => {
        res.status(500).send();
  });
  if (hashedPw) {
    const user = new User({ email, password: hashedPw });
    const userDoc = await user.save()
    .catch((err) => {
      if (!err.errors || err.errors.email && err.errors.email.reason) {
        res.status(500).send(); //Internal error connecting with MongoDB 
      } else {
        res.send(409).send(); //Email conflict with existing user
      }
    });
    if (userDoc) {
      const token = jwt.sign(
        { id: userDoc.id },
        process.env.SECRET_KEY,
        { expiresIn: "180d" },
      );
      res.cookie("token", token, { httpOnly: true });
      res.status(201).send();

      const userProfile = await new Profile({ user: userDoc.id, firstName: "", lastName: "", phone: "", location: "", imageUrl: ""}).save()
          .catch((err) => {
            throw new GeneralError("Error creating user profile on registration.");
          })


    }
  }
});

module.exports = router;
