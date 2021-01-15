const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier'); 
const router = express.Router();
const fileUpload = multer();

//Get cloud_name, api_key and api_secret from .env
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//stream file upload
router.post("/", fileUpload.single("image"), async function(req, res) {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
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

    //upload and get response
    async function upload(req) {
        let result = await streamUpload(req);
        console.log(result.url);
        res.send(result.url)
    }

    upload(req);

})





module.exports = router;