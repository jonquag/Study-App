const express = require('express');
const { check } = require('express-validator');

const auth = require('../middleware/verifyAuth');
const postController = require('../controllers/post');
const commentController = require('../controllers/comment');

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

// PUT forum/post/:postId
// Edit a post using post id
router.put('/post/:postId', auth, postController.editPost);

// PUT /forum/post/vote/:postId
// Adds user id to votes array in post
router.put('/post/vote/:postId', auth, postController.addUpvote);

// PUT /forum/post/unvote/:postId
// Remove upvote from a post
router.put('/post/unvote/:postId', auth, postController.removeUpvote);

// POST forum/post/comment/:postId
// Creates a comment for a post
router.post(
    '/post/comment/:postId',
    auth,
    [check('text', 'Text is required').notEmpty()],
    commentController.addComment
);

// DELETE forum/post/comment/:postId/:commentId
// Removes a comment from a post and deletes it from db.
router.delete(
    '/post/comment/:postId/:commentId',
    auth,
    commentController.deleteComment
);

// PUT forum/post/comment/:postId
// Edit a comment using comment id
router.put('/post/comment/:commentId', auth, commentController.editComment);

module.exports = router;
