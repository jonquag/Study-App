const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: { type: String, required: true },
    courseCode: String,
    program: String,
    // students: {
    //     type: [mongoose.Schema.Types.ObjectId], 
    //     ref: 'User',
    // }
});

module.exports = mongoose.model('Course', courseSchema);
