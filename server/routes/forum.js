const express = require('express');
const { check } = require('express-validator');

const { NotFound } = require('../utils/errors');
const auth = require('../middleware/verifyAuth');

const Group = require('../models/Group');

const router = express.Router();

const forumController = require('../controllers/forum');
const postController = require('../controllers/post');

// Creates a forum to a specific group
router.post(
    '/:groupId',
    [check('name', 'Forum name is required').notEmpty()],
    auth,
    forumController.creatForum
);

// returns a group forum and its posts base on group id.
router.get('/:groupId', auth, async (req, res, next) => {
    const groupId = req.params.groupId;
    try {
        const group = await Group.findById(groupId).populate({
            path: 'forum',
            model: 'Forum',
            populate: {
                path: 'posts',
                model: 'Post',
            },
        });

        if (!group) throw new NotFound('No group found');
        res.status(200).json({ group });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// POST forum/post
// Creates a post using userId
// router.post(
//     '/post',
//     auth,
//     [
//         check('title', 'Title is required').notEmpty(),
//         check('text', 'Text is required').notEmpty(),
//     ],
//     postController.creatPost
// );

// POST forum/post/:forumId
// Creates a post in a forum
router.post(
    '/post/:forumId',
    auth,
    [
        check('title', 'Title is required').notEmpty(),
        check('text', 'Text is required').notEmpty(),
    ],
    postController.creatForumPost
);

module.exports = router;
