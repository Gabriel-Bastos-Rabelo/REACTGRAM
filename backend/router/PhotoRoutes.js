const express = require("express");
const router = express.Router();

//Controller

const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, updatePhoto, likePhoto, commentPhoto, searchPhoto, getPhotoById } = require("../controllers/PhotoController")
//Middleware
const { insertPhotoValidation, photoUpdateValidation, photoCommentValidation } = require("../middlewares/PhotoValidation");
const { authGuard } = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");



//Routes
router.post("/", authGuard, imageUpload.single("image"), insertPhotoValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get("/:id", getPhotoById);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);
router.put("/like/:id", authGuard, likePhoto);
router.put("/comment/:id", authGuard, photoCommentValidation(), validate, commentPhoto);
router.get("/search", authGuard, searchPhoto);
module.exports = router;