const express = require('express');
const router = express.Router();
const { BadRequest, GeneralError } = require('../utils/errors');
const Course = require("../models/courses");
const University = require('../models/universities');

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

//POST create a new course and update university with the course id
router.post('/courses', async function(req, res, next) {
    const course = new Course(req.body);
    const {universityId} = req.body;
    if (!universityId) return next(new BadRequest('Missing required field'));
    try {
        const courseDoc = await course.save();
        await University.findByIdAndUpdate(req.body.universityId, { "$push": { "courses": courseDoc.id } })
        res.sendStatus(201);
    } catch (err) {
       next(new GeneralError('Server Error'));
    }
})

//POST create a new university
router.post('/', async function (req, res, next) {
    try {
        const university = new University(req.body);
        await university.save();
        res.sendStatus(200);
    } catch (err) {
        next(new GeneralError('Server Error'));
    }
});

module.exports = router;
