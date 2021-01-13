const express = require('express');
const router = express.Router();
const auth = require('../middleware/verify-auth');

const Profile = require('../models/Profile');
const User = require('../models/user');

router.get('/:user_id', auth, async (req, res) => {
    try {
        
    const profile = await Profile.findOne({ user: req.params.user_id });

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

module.exports = router;