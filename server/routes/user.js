const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/verifyAuth');
const User = require('../models/user');
const University = require('../models/universities');
const { BadRequest, GeneralError } = require('../utils/errors');
const Group = require('../models/Group');
const Course = require('../models/courses');
//require('../models/courses');

// Get the logged in user
router.get('/', verifyAuth, async function (req, res, next) {
    const userId = req.body.userId;
    const userDoc = await User.findById(userId)
        .populate({ path: 'courses', model: 'Course' })
        .select('-password')
        .populate({ path: 'groups', model: 'Group'})
        .catch(() => {
            return next(new GeneralError('Error Establishing a Database Connection'));
        });

    return userDoc ? res.send(userDoc) : res.sendStatus(400);
});

// Gets all the current users courses
router.get('/courses', verifyAuth, async function (req, res, next) {
    const userDoc = await User.findById({ _id: req.body.userId })
        .populate({ path: 'courses', model: 'Course' })
        .catch(() => {
            return next(new GeneralError('Error Establishing a Database Connection'));
        });

    if (userDoc && userDoc.courses) {
        res.send(userDoc.courses);
    } else {
        next(new GeneralError('No user found.'));
    }
});

// Adds a user to a course, sends the updated user
router.put('/courses/:courseId', verifyAuth, async function (req, res, next) {
    const courseId = req.params.courseId;
    const userId = req.body.userId;
    try {
        const userDoc = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { courses: courseId } },
            { useFindAndModify: false, new: true }
        )
            .populate({ path: 'courses', model: 'Course' })
            .catch((err) => {
                if (err.kind == 'ObjectId') {
                    throw new BadRequest('Invalid Course ID');
                }
                throw new GeneralError('Error Establishing a Database Connection');
            });
        res.status(201);
        res.send(userDoc);
    } catch (err) {
        next(err);
    }
});

// updates a user based on selected courses id	
router.post('/courses', verifyAuth, async function (req, res, next) {	
    const userId = req.body.userId;	
    try {	
        const user = await User.findByIdAndUpdate(
            userId, 
            { courses: req.body },
            { new: true },
        )
            .populate({ path: 'courses', model: 'Course' })
            .populate({ path: 'groups', model: 'Group'});
        if (!user)	
            return res.status(400).json({ message: 'Can not update user' });	
        res.status(200).json({ user });	
    } catch (err) {	
        console.log(err.message);	
        res.send('Server Error');	
    }	
});

//Remove a user from a course, removes them from all groups that belong to that course, returns user data
router.delete('/courses/:courseId', verifyAuth, async function (req, res, next) {
    const courseId = req.params.courseId;
    const userId = req.body.userId;

    // start new session for transaction
    const session = await User.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        const userDoc = await User.findByIdAndUpdate(
            userId,
            { 
                $pull: { courses: courseId },
                $pullAll: {groups: req.body.groupsRemoved}
            },
            { useFindAndModify: false, new: true }
        )
        .populate({ path: 'courses', model: 'Course' })
        .populate({ path: 'groups', model: 'Group'})
        .catch((err) => {
            if (err.kind == "ObjectId") {
                throw new BadRequest('Invalid Course ID');
            }
            throw new GeneralError('Error Establishing a Database Connection');
        });
        if (userDoc) {
            await Group.updateMany(
                { course: courseId },
                { $pull: { members: userId } },
                opts
            ).catch(err => {
                throw new GeneralError('Server Error');
            });
        }
        
        //commit transaction
        await session.commitTransaction();
        session.endSession();
        
        //send updated user data as response
        res.status(201);
        return res.send(userDoc);

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
});

//Assign a user to a University, sends the updated user
router.put('/universities/:universityId', verifyAuth, async function (req, res, next) {
    const universityId = req.params.universityId;
    const userId = req.body.userId;
    const session = await User.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        const userDoc = await User.findByIdAndUpdate(
            userId,
            { university: universityId },
            opts
        ).catch((err) => {
            if (err.kind == 'ObjectId') {
                throw new BadRequest('Invalid University ID');
            }
            throw new GeneralError('Error Establishing a Database Connection');
        });
        if (userDoc.university) {
            await University.findByIdAndUpdate(
                userDoc.universityId,
                { $addToSet: { students: userId } },
                opts
            );
        }
        await University.findByIdAndUpdate(
            universityId,
            { $addToSet: { students: userId } },
            opts
        );
        await session.commitTransaction();
        session.endSession();
        res.status(201);
        return res.send(userDoc);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
});

// returns all the groups a user can join from their courses
router.get('/groups', verifyAuth, async function (req, res, next) {
    try {
        const userDoc = await User.findById({ _id: req.body.userId })
            .populate({
                path: 'courses',
                model: 'Course',
                populate: {
                    path: 'groups',
                },
            })
            .catch(() => {
                throw new GeneralError('Error returning groups to join');
            });
        if (userDoc && userDoc.courses) {
            console.log(userDoc.d)
            res.send(userDoc.courses);
        } else {
            res.sendStatus(500);
        }
    } catch (err) {
        next(err);
    }
});


// add a new user to a group from a course they are enrolled in
router.post('/groups/:groupId', verifyAuth, async function (req, res, next) {
    const userId = req.body.userId;
    const groupId = req.params.groupId;

    const session = await Group.startSession();
    session.startTransaction();
    try {
        const groupDoc = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: userId } },
            { useFindAndModify: false, new: true }
        )
            .session(session)
            .catch((err) => {
                if (err.kind == 'ObjectId') {
                    throw new BadRequest('Invalid Group ID');
                }
                throw new GeneralError('Server Error');
            });
        if (groupDoc) {
            await User.findByIdAndUpdate(userId, {
                $addToSet: { groups: groupId },
            }).session(session);
        }
        await session.commitTransaction();
        session.endSession();
        res.status(201);
        res.send(groupDoc);
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
});

// create a new group from a course they are enrolled in 
router.post('/groups', verifyAuth, async function (req, res, next) {

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

        const userUpdate = await User.findByIdAndUpdate(userId, { $addToSet: { groups: instance._id } }, { useFindAndModify: false, new: true })
        .session(session)
        .catch((err) => {
            throw new GeneralError('Error updating User Groups');
        });

        const courseUpdate = await Course.findByIdAndUpdate(courseId, { $addToSet: { groups: instance._id } }, { useFindAndModify: false, new: true })
        .session(session)
        .catch((err) => {
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

});



// delete a user from a group
router.delete('/groups/:groupId', verifyAuth, async function (req, res, next) {
    const userId = req.body.userId;
    const groupId = req.params.groupId;

    const session = await Group.startSession();
    session.startTransaction();
    try {
        const groupDoc = await Group.findByIdAndUpdate(
            groupId,
            { $pull: { members: userId } },
            { useFindAndModify: false, new: true }
        )
            .session(session)
            .catch((err) => {
                if (err.kind == 'ObjectId') {
                    throw new BadRequest('Invalid Group ID');
                }
                throw new GeneralError('Server Error');
            });
        if (groupDoc) {
            await User.findByIdAndUpdate(userId, { $pull: { groups: groupId } }).session(
                session
            );
        }
        await session.commitTransaction();
        session.endSession();
        res.status(201);
        res.send(groupDoc);
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
});

module.exports = router;
