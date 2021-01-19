const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: { type: String, required: true },
    courseCode: String,
    program: String,
});

module.exports = mongoose.model('Course', courseSchema);
