const express = require("express");
const router = express.Router();

const User = require("../models/user");
const University = require("../models/universities");
require("../models/courses");

// Get the logged in user
router.get("/", async function(req, res) {
    const userId = req.body.userId;
    const userDoc = await User.findById(userId)
      .catch(() => { return null });
    return userDoc ? res.send(userDoc) : res.sendStatus(500);
})

// Gets all the current users courses
router.get("/course", async function(req, res) {
    const userDoc = await User.findById({ _id: req.body.userId })
      .populate({path: 'courses', model: 'Course'})
      .catch(() => { return null });
    if (userDoc && userDoc.courses) {
        res.send(userDoc.courses);
    } else {
        res.sendStatus(500);
    }
})

// Adds a user to a course, sends the updated user
router.post("/course/add", async function(req, res) {
    const {courseId, userId} = req.body.userId;
    if (!courseId) {
        return res.sendStatus(400);
    }
    const userDoc = await User.findByIdAndUpdate(
      userId, 
      {$addToSet: { 'courses': courseId }},
      {useFindAndModify: false, new: true}
    ).catch(() => { return null });
    res.status(userDoc ? 201 : 500);
    res.send(userDoc);
});

//Remove a user from a course, sends the updated user
router.post("/course/remove", async function(req, res) {
    const {courseId, userId} = req.body.userId;
    if (!courseId) {
        return res.sendStatus(400);
    }
    const userDoc = await User.findByIdAndUpdate(
      userId, 
      {$pull: { 'courses': courseId }},
      {useFindAndModify: false, new: true}
    ).catch(() => { return null });
    res.status(userDoc ? 201 : 500);
    res.send(userDoc);
});

//Assign a user to a University, sends the updated user
router.post("/university/enroll", async function(req, res) {
    const {universityId, userId} = req.body;
    if (!universityId) res.sendStatus(400);
    const session = await User.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        const userDoc = await User.findByIdAndUpdate(
          userId, 
          {university: universityId},
          opts,
        );
        await University.findByIdAndUpdate(
            universityId,
            {$pull: { 'students': userId }},
            opts,
        );
        await University.findByIdAndUpdate(
            universityId,
            {$addToSet: { 'students': userId }},
            opts
        );
        await session.commitTransaction();
        session.endSession();
        res.status(userDoc ? 201 : 500);
        return res.send(userDoc);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.sendStatus(500);
    }
});

module.exports = router;
