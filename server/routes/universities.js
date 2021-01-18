const express = require('express');
const router = express.Router();

const University = require('../models/universities');
require("../models/courses");


//GET all universities with populated courses
router.get("/", async function(req, res, next) {
    const allUniversities = await University.find()
    .catch(() => {
        return res.status(500).send();
    });
    res.status(200).send(allUniversities);
});

//GET university with universityId and populated courses
router.get('/:universityId/courses', async function(req, res, next) {
    const universityId = req.params.universityId;
    const university = await University.findById({ _id: universityId })
    .populate({path: 'courses', model: 'Course'});
    res.status(200).send(university);
});

///////////////////////////////////////////////////////////////////////////
//// Use these routes to add a university and a course
///////////////////////////////////////////////////////////////////////////

// router.post('/courses', async function(req, res, next) {
//     const course = new Course(req.body);
//     const courseDoc = await course.save();
//     await University.findByIdAndUpdate(req.body.universityId, { "$push": { "courses": courseDoc.id } })
//     res.sendStatus(201);
// })

// router.post('/', async function (req, res, next) {
//     const university = new University(req.body);
//     await university.save();
//     res.sendStatus(200);
// });

///////////////////////////////////////////////////////////////////////////
//// Done
///////////////////////////////////////////////////////////////////////////

module.exports = router;
