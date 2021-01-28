const { GeneralError, NotFound } = require('../utils/errors');
const { validationResult } = require('express-validator');

const Profile = require('../models/profile');
const Post = require('../models/post');

exports.creatPost = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({
            error: errors.array(),
        });

    const { title, text, userId } = req.body;

    try {
        const profile = await Profile.findOne({ user: userId });

        if (!profile) throw new NotFound('No profile found');

        const post = new Post({
            user: userId,
            title,
            text,
            name: `${profile.firstName} ${profile.lastName}`,
            avatar: profile.imageUrl,
        });

        await post.save().catch(() => {
            throw new GeneralError(
                'Error creating user profile on registration.'
            );
        });
        res.status(201).json({ post });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
