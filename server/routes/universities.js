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

module.exports = router;
