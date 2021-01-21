const mongoose = require('mongoose');

const universitySchema = mongoose.Schema({
    name: { type: String, required: true },
    courses: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Course',
    },
    students: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'User',
    },
});

module.exports = mongoose.model('University', universitySchema);
