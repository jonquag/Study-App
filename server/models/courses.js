const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = mongoose.Schema({
    name: { type: String, required: true },
    courseCode: String,
    program: String,
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'Group',
    }],
});

module.exports = mongoose.model('Course', courseSchema);
