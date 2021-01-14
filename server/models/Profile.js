const mongoose = require('mongoose');

// Create schema for profile fields
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phone: {
        type: String
    },
    location: {
        type: String
    }
});

// create Profile model with ProfileSchema and export module
module.exports = mongoose.model('Profile', ProfileSchema);
