const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");
const upload=require("../middleware/uploadMiddleware");
const{
    registerUser,
    loginUser,
    uploadProfilePicture
}=require("../controllers/authController");
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post(
    "/upload-profile-picture",
    authMiddleware,
    upload.single("profilePic"),
    uploadProfilePicture
);
module.exports=router;