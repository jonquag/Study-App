const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyAuth');
const { NotFound } = require('../utils/errors');

const Profile = require('../models/profile');
const User = require('../models/user');
const updateProfile = require('../controllers/profile');

// Returns current user profile based on ID
router.get('/:user_id', auth, async (req, res, next) => {
    try {

    //find profile by user id and populate email
    const profile = await Profile.findOne({ user: req.body.userId }).populate('user', ['email']);

    if(!profile) {
         throw new NotFound("No profile found");
    }

    res.json(profile);

    } catch(error){
        next(error);
    }
})

//Updates user profile fields based on ID and populates email
router.put('/:user_id', auth, updateProfile);

module.exports = router;
