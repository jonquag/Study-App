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

exports.deleteComment = async (req, res, next) => {
    const { postId, commentId } = req.params;

    try {
        const post = await Post.findById(postId);
        if (!post) throw new NotFound('No post found');

        const comment = await Comment.findById(commentId);
        if (!comment) throw new NotFound('No comment found');

        const postComment = post.comments.find(
            pc => pc.toString() === commentId
        );
        if (!postComment) throw new NotFound('No comment in post found');

        // check if a usere is deleteing his/her own comment
        if (comment.user.toString() !== req.body.userId)
            throw new Unauthorized('Cannot delete post');

        post.comments = post.comments.filter(pc => pc.toString() !== commentId);

        const postRes = await post.save();
        if (!postRes) throw new GeneralError('Error saving post');

        const commentRes = await comment.remove();
        if (!commentRes) throw new GeneralError('Error deleting a comment');

        res.status(200).json({ post });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};
