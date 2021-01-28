const express = require('express');
const { check } = require('express-validator');

const auth = require('../middleware/verifyAuth');
const router = express.Router();

const postController = require('../controllers/post');

// POST /posts
// Creates a post using userId
router.post(
    '/',
    auth,
    [
        check('title', 'Title is required').notEmpty(),
        check('text', 'Text is required').notEmpty(),
    ],
    postController.creatPost
);

module.exports = router;
