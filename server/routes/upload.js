const express = require('express');
var multer = require('multer');
const router = express.Router();

const fileUpload = multer();

router.post("/", async function(req, res) {

})

module.exports = router;