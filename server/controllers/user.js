const Course = require('../models/courses');
const Conversation = require('../models/Conversation');
const Group = require('../models/Group');
const User = require('../models/user');
const { NotFound, GeneralError } = require('../utils/errors');

//TODO move rest of functions from user routes here

exports.createGroup = async (req, res, next) => {
    const userId = req.body.userId;
    const imageUrl = req.body.imageUrl;
    const courseId = req.body.courseId;
    const groupName = req.body.groupName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

    const session = await Group.startSession();
    session.startTransaction();

    try {

        const instance = (await Group.create([{
            name: groupName,
            members: [userId],
            image: imageUrl,
            course: courseId, 
            admin: userId
        }], {session}))[0];

        await Conversation.create([{ group: instance._id }], { session });

        await User.findByIdAndUpdate(userId, { $addToSet: { groups: instance._id } }, { useFindAndModify: false, new: true })
        .session(session)
        .catch(() => {
            throw new GeneralError('Error updating User Groups');
        });

        await Course.findByIdAndUpdate(courseId, { $addToSet: { groups: instance._id } }, { useFindAndModify: false, new: true })
        .session(session)
        .catch(() => {
            throw new GeneralError('Error updating Course Groups');
        });

        await session.commitTransaction();
        session.endSession();
        res.status(201);
        res.send({
            data: instance
        });

    } catch(err) {
        console.log(err)
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
};

exports.getConversations = async (req, res, next) => {

    try {
        const user = await User.findById(req.body.userId);
        if (!user) throw new NotFound('No user found');

        const {groups} = user;
        const convos = await Conversation.find({ 'group': {$in: groups }});
        if (!convos) throw new GeneralError('Error finding conversations');

        res.status(200).json(convos);
    } catch(err) {
        next(err);
    }
};
