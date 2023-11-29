const express = require("express");
const router = express.Router();

//Controller

const {insertPhoto, deletePhoto} = require("../controllers/PhotoController")
//Middleware
const {insertPhotoValidation} = require("../middlewares/PhotoValidation");
const {authGuard} = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");



//Routes
router.post("/", authGuard, imageUpload.single("image"), insertPhotoValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
module.exports = router;