const express = require('express');
const router = express.Router();

const University = require('../models/universities');

router.get("/", async function(req, res, next) {

    const allUniversities = await University.find({})
    .catch(() => {
        return res.status(500).send();
    });

    res.status(200).send(allUniversities);
});

router.get('/:universityId/courses', function(req, res, next) {
    const universityId = req.params.universityId;
    res.status(200).send();
});

router.put('/', async function (req, res, next) {
    const university = new University(req.body);
    res.send(200).send();
});

module.exports = router;
