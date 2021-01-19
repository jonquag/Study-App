const express = require('express');
const { NotExtended } = require('http-errors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier'); 
const auth = require('../middleware/verifyAuth');
const { GeneralError } = require('../utils/errors');
const router = express.Router();
const fileUpload = multer();

//Get cloud_name, api_key and api_secret from .env
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//stream file upload
router.post("/", fileUpload.single("image"), auth, async function(req, res, next) {

  try {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
  
          streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
  }

  const result = await streamUpload(req);
  if(!result) {
    throw new GeneralError("Upload error.")
  }
  res.json({url: result.url})

  } catch(err) {
    next(err)
  }

})

module.exports = router;