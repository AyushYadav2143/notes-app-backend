const express=require("express");
const router=express.Router();
const Middleware=require("../middleware/authMiddleware");
const{
    registerUser
}=require("../controllers/authController");
router.post("/register",registerUser);
module.exports=router;