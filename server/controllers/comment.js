const { GeneralError, NotFound, Unauthorized } = require('../utils/errors');
const { validationResult } = require('express-validator');

const Profile = require('../models/profile');
const Post = require('../models/post');
const Comment = require('../models/Comment');

exports.addComment = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({
            error: errors.array(),
        });

    const { postId } = req.params;
    const { userId, text } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) throw new NotFound('No post found');

        const profile = await Profile.findOne({ user: userId });
        if (!profile) throw new NotFound('No profile found');

        const comment = new Comment({
            user: userId,
            text,
            name: `${profile.firstName} ${profile.lastName}`,
            avatar: profile.imageUrl,
        });

        const commentRes = comment.save();
        if (!commentRes) throw new GeneralError('Error adding a comment');

        post.comments.unshift(comment);

        const postRes = await post.save();
        if (!postRes) throw new GeneralError('Error saving post');

        res.status(201).json({ comment });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};
