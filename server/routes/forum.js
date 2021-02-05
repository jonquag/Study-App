const express = require('express');
const { check } = require('express-validator');

const auth = require('../middleware/verifyAuth');
const postController = require('../controllers/post');
const commentController = require('../controllers/comment');
const Group = require('../models/Group');
const Forum = require('../models/Forum');

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

// GET forum/post/:postId
// Returns a post with all its comments
router.get('/post/:postId', auth, postController.getPost);

// PUT forum/post/:forumId/:postId
// Disables a post from being viewed in a forum.
router.put('/post/:forumId/:postId', auth, postController.hidePost);

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

// PUT forum/post/comment/:postId/:commentId
// Disables a comment from being viewed in a post.
router.put(
    '/post/comment/:postId/:commentId',
    auth,
    commentController.hideComment
);

// PUT forum/post/comment/:postId
// Edit a comment using comment id
router.put('/post/comment/:commentId', auth, commentController.editComment);

// returns all the groups a user can join from their courses
router.get('/:groupId', auth, async function (req, res, next) {
//console.log(req.params.groupId)
    try {
        // start new session for transaction
        const session = await Group.startSession();
        session.startTransaction();

        const userDoc = await Group.findById(req.params.groupId)
            .populate({
                path: 'forums',
                model: 'Forum',
    
            })
            .session(session)
            .catch(() => {
                throw new GeneralError('Error returning group forum');
            });
            const forumDoc = await Forum.findById({ _id: userDoc.forum })
            .populate({
                path: 'posts',
                model: 'Post',
    
            })
            .catch(() => {
                throw new GeneralError('Error returning forum posts');
            });
        if (forumDoc && forumDoc.posts) {
            res.send(forumDoc);
        } else {
            res.sendStatus(500);
        }
    } catch (err) {
        next(err);
    }
});


module.exports = router;
