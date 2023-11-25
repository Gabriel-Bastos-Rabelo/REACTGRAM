const express = require("express");
const router = express.Router();

//Controller

const {register, login, getCurrentUser, update} = require("../controllers/userController");


//middlewares

const validate = require("../middlewares/handleValidation");

const {userCreateValidation, loginValidation, userUpdateValidation} = require("../middlewares/userValidation")

//Routes

const {authGuard}  = require("../middlewares/authGuard");
const {imageUpload} = require("../middlewares/imageUpload");


router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update);

module.exports = router;