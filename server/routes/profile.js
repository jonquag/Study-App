const express = require('express');
const router = express.Router();
const auth = require('../middleware/verify-auth');

const Profile = require('../models/Profile');
const { update } = require('../models/user');
const User = require('../models/user');

// Returns current user profile based on ID
router.get('/:user_id', auth, async (req, res) => {
    try {

    //find profile by user id and populate email
    const profile = await Profile.findOne({ user: req.body.userId }).populate('User', ['email']);

    if(!profile) {
        return res.status(400).json({ msg: "No profile found." });
    }

    res.json(profile);

    } catch(err){
    console.log(err.message);
    if(err.kind == "ObjectId") {
        return res.status(400).json({ msg: "Profile not found for this Id." });
    }
    res.status(500).send('Server Error');
    }

})

//Updates user profile fields based on ID and populates email
router.put('/:user_id', auth, async (req, res) => {
    try {
        //find profile
        let profile = await Profile.findOne({ user: req.body.userId })
        const { firstName, lastName, phone, location } = req.body;

        //if profile found then update
        if(profile) {
            const filter = { user: req.body.userId };
            const updatedProfile = {};
            if(firstName) updatedProfile.firstName = firstName;
            if(lastName) updatedProfile.lastName = lastName;
            if(phone) updatedProfile.phone = phone;
            if(location) updatedProfile.location = location;

            //update profile and populate email
            profile = await Profile.findOneAndUpdate(filter, updatedProfile,  { new: true } ).populate('User', ['email'])

            return res.json(profile);
        }
        //return error message if no profile found
        return res.status(400).json({ msg: "No profile found." });
        
    } catch(err) {
        console.log(err.message);
        res.status(500).send("Server error!");
    }
})

module.exports = router;