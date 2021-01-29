const express = require('express');
const { check } = require('express-validator');

const auth = require('../middleware/verifyAuth');
const postController = require('../controllers/post');

const router = express.Router();

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

// DELETE forum/post/:forumId/:postId
// Removes a post from a forum and deletes the post from db.
router.delete('/post/:forumId/:postId', auth, postController.deletePost);

module.exports = router;
