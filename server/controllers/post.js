const { GeneralError, NotFound, Unauthorized } = require('../utils/errors');
const { validationResult } = require('express-validator');

const Profile = require('../models/profile');
const Post = require('../models/post');
const Forum = require('../models/Forum');

exports.creatForumPost = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({
            error: errors.array(),
        });

    const forumId = req.params.forumId;
    const { title, text, userId, postAvatar } = req.body;

    try {
        const forum = await Forum.findById(forumId);
        if (!forum) throw new NotFound('No forum found');

        const profile = await Profile.findOne({ user: userId });
        if (!profile) throw new NotFound('No profile found');

        const post = new Post({
            user: userId,
            title,
            text,
            postAvatar,
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

exports.deletePost = async (req, res, next) => {
    const { forumId, postId } = req.params;

    try {
        const forum = await Forum.findById(forumId);
        if (!forum) throw new NotFound('No forum found');

        const post = await Post.findById(postId);
        if (!post) throw new NotFound('No post found');

        const forumPost = forum.posts.find(fp => fp.toString() === postId);
        if (!forumPost) throw new NotFound('No post in forum found');

        // check if useres are deleteing their own posts
        if (post.user.toString() !== req.body.userId)
            throw new Unauthorized('Cannot delete post');

        forum.posts = forum.posts.filter(fp => fp.toString() !== postId);

        const forumRes = await forum.save();
        if (!forumRes) throw new GeneralError('Error saving forum');

        const postRes = await post.remove();
        if (!postRes) throw new GeneralError('Error deleting post');

        res.status(200).json({ forum });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};

exports.editPost = async (req, res, next) => {
    const { postId } = req.params;
    const { userId, title, text, postAvatar } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) throw new NotFound('No post found');

        // check if useres are editing their own posts
        if (post.user.toString() !== userId)
            throw new Unauthorized('Cannot edit post');

        if (title) post.title = title;
        if (text) post.text = text;
        if (postAvatar) post.postAvatar = postAvatar;

        const response = await post.save();
        if (!response) throw new GeneralError('Error editing post');

        res.status(200).json({ post });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};

exports.addUpvote = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req.body;
    console.log(postId);
    try {
        const post = await Post.findById(postId);
        if (!post) throw new NotFound('No post found');

        // make sure a user can up vote a post only once.
        const votesArr = post.votes.filter(
            vote => vote.user.toString() === userId
        );

        if (votesArr.length > 0)
            throw new Unauthorized('Cannot up vote more than once');

        post.votes.unshift({ user: userId });

        const response = await post.save();
        if (!response) throw new GeneralError('Error voting');

        res.status(200).json({ post });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};
