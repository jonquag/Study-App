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

module.exports = router;
