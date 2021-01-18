const mongoose = require('mongoose');

// Create schema for profile fields
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        default: ""
    }
});

// create Profile model with ProfileSchema and export module
module.exports = mongoose.model('Profile', ProfileSchema);
