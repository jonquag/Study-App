const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: { type: String, required: true },
    courseCode: String,
    faculty: String,
    students: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
        }
    ],
});

module.exports = mongoose.model('Course', courseSchema);
