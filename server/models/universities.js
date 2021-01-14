const mongoose = require('mongoose');

const universitySchema = mongoose.Schema({
    name: { type: String, required: true },
    courses: [
        {
            courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        },
    ],
    students: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
        }
    ],
});

module.exports = mongoose.model('University', universitySchema);
