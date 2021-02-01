const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    admin: { type: Schema.Types.ObjectId, ref: 'User' },
    moderators: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    forum: {
        type: Schema.Types.ObjectId,
        ref: 'Forum',
    },    
    image: {type: String},
});

module.exports = mongoose.model('Group', GroupSchema);
