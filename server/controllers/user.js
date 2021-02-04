const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Conversation = require('../models/Conversation');
const Course = require('../models/courses');
const Group = require('../models/Group');
const User = require('../models/user');
const { GeneralError, NotFound, Unauthorized } = require('../utils/errors');

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
        const convos = await Conversation.find({ 
            'group': { $in: groups }
        }).populate({
            path : 'messages',
            populate: {
                path: 'profile',
                model: 'Profile',
            },
        });

        if (!convos) throw new GeneralError('Error finding conversations');

        res.status(200).json(convos);
    } catch(err) {
        console.log(err);
        next(err);
    }
};

exports.passwordChange = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({
            error: errors.array(),
        });

    const { oldPassword, newPassword, userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) throw new NotFound('No user found');

        const comparePassword = await bcrypt.compare(
            oldPassword,
            user.password
        );
        if (!comparePassword)
            throw new Unauthorized('Unauthorized to change password');

        const newHashedPw = await bcrypt.hash(newPassword, 10);
        if (!newHashedPw) throw new GeneralError('Failed to hash password');

        user.password = newHashedPw;

        const response = await user.save();
        if (!response) throw new GeneralError('Failed saving user');

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};
