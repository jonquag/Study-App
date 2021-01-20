const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const validateBody = require('../middleware/validateBody');
const validateEntryReq = validateBody.entry;
const Profile = require('../models/profile');
const { GeneralError, Conflict } = require('../utils/errors');

router.post("/", validateEntryReq, async function(req, res, next) {
  const {email, password, courses, university} = req.body;

  try {
      const hashedPw = await bcrypt.hash(password, 10)
      .catch(() => {
          throw new GeneralError('Failed to hash password.')
      });
      const user = new User({ email, password: hashedPw, courses, university });
      const userDoc = await user.save()
      .catch((err) => {
        if (!err.errors || err.errors.email && err.errors.email.reason) {
          throw new GeneralError('Error connecting to database.');
        } else {
          throw new Conflict('Email conflicts with existing user.');
        }
      });
      const token = jwt.sign(
        { id: userDoc.id },
        process.env.SECRET_KEY,
        { expiresIn: "180d" },
      );
      await new Profile({ user: userDoc.id }).save()
      .catch(() => {
        throw new GeneralError("Error creating user profile on registration.");
      })
      res.cookie("token", token, { httpOnly: true });
      res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
