const { validationResult } = require('express-validator');
const { GeneralError } = require('../utils/errors');

const Forum = require('../models/Forum');
const Group = require('../models/Group');

exports.creatForum = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            error: errors.array(),
        });

    const groupId = req.params.groupId;
    const { name, userId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) throw new NotFound('No group found');

        const forum = new Forum({
            name,
            user: userId,
        });

        const response = await forum.save();
        if (!response) throw new GeneralError('Error creating forum');

        group.forum = forum._id;

        const groupRes = await group.save();
        if (!groupRes) throw new GeneralError('Error adding forum to a group');

        res.status(201).json({ forum });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};
