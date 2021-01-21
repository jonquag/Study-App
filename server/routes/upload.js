const express = require('express');
const multer = require('multer');
const auth = require('../middleware/verifyAuth');
const router = express.Router();
const fileUpload = multer();
const streamUpload = require('../controllers/upload');
const updateProfile = require('../controllers/profile');

//stream file upload
router.post("/", fileUpload.single("image"), auth, [streamUpload, updateProfile]);

module.exports = router;
