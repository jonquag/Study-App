const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyAuth');
const { NotFound, GeneralError } = require('../utils/errors');

const Profile = require('../models/profile');
const User = require('../models/user');
const { NotExtended } = require('http-errors');

// Returns current user profile based on ID
router.get('/:user_id', async (req, res, next) => {
    console.log(req.params.user_id);
    try {
        //find profile by user id and populate email
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate('user', ['email']);

        if (!profile) {
            throw new NotFound('No profile found.');
        }

        res.json(profile);
    } catch (err) {
        next();
    }
});

//Updates user profile fields based on ID and populates email
router.put('/:user_id', auth, async (req, res, next) => {
    try {
        //find profile
        let profile = await Profile.findOne({ user: req.body.userId });
        const { firstName, lastName, phone, location, imageUrl } = req.body;

        //if profile found then update
        if (profile) {
            const filter = { user: req.body.userId };
            const updatedProfile = {};
            if (firstName !== null) updatedProfile.firstName = firstName;
            if (lastName !== null) updatedProfile.lastName = lastName;
            if (phone !== null) updatedProfile.phone = phone;
            if (location !== null) updatedProfile.location = location;
            if (imageUrl !== null) updatedProfile.imageUrl = imageUrl;

            //update profile and populate email
            profile = await Profile.findOneAndUpdate(filter, updatedProfile, {
                new: true,
            }).populate('user', ['email']);

            return res.json(profile);
        }
        //return error message if no profile found
        throw new NotFound('No profile found.');
    } catch (err) {
        next();
    }
});

module.exports = router;
