const { GeneralError, NotFound } = require('../utils/errors');
const { validationResult } = require('express-validator');

const Profile = require('../models/profile');
const Post = require('../models/post');
const Forum = require('../models/Forum');

// exports.creatPost = async (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty())
//         return res.status(400).json({
//             error: errors.array(),
//         });

//     const { title, text, userId } = req.body;

//     try {
//         const profile = await Profile.findOne({ user: userId });
//         if (!profile) throw new NotFound('No profile found');

//         const post = new Post({
//             user: userId,
//             title,
//             text,
//             name: `${profile.firstName} ${profile.lastName}`,
//             avatar: profile.imageUrl,
//         });

//         const response = await post.save();
//         if (!response) throw new GeneralError('Error creating post.');

//         res.status(201).json({ post });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };

exports.creatForumPost = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({
            error: errors.array(),
        });

    const forumId = req.params.forumId;
    const { title, text, userId } = req.body;

    try {
        const forum = await Forum.findById(forumId);
        if (!forum) throw new NotFound('No forum found');

        const profile = await Profile.findOne({ user: userId });
        if (!profile) throw new NotFound('No profile found');

        const post = new Post({
            user: userId,
            title,
            text,
            name: `${profile.firstName} ${profile.lastName}`,
        });

        const response = await post.save();
        if (!response) throw new GeneralError('Error creating post.');

        forum.posts.unshift(post);
        const forumRes = forum.save();
        if (!forumRes) throw new GeneralError('Error adding a post to a forum');

        res.status(201).json({ post });
    } catch (err) {
        console.log(err.message);
        next(error);
    }
};
