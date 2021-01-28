const express = require('express');
const multer = require('multer');
const auth = require('../middleware/verifyAuth');
const router = express.Router();
const fileUpload = multer();
const streamUpload = require('../controllers/upload');
const updateProfile = require('../controllers/profile');
const { response } = require('express');


//stream file upload
router.post("/", fileUpload.single("image"), auth, [streamUpload, updateProfile]);

//stream image upload and return hosted url
router.post("/single", fileUpload.single("image"), auth, [streamUpload, (req, res, next) => {
    try {
        res.status(201).json(req.body);
    } catch(err) {
        next(err);
    }
}])

module.exports = router;
