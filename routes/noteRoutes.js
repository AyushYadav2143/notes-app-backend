const express=require("express");         //import the express lib lol so easy itna to sbko pta hai
const router=express.Router();  
const authMiddleware = require("../middleware/authMiddleware");            //create router object 
const{                                     //import  getNotes fn and create notes fn from controllers file
    getNotes,
    createNote,
    updateNote,
    deleteNote
}=require("../controllers/noteControllers");           //path for that fn
router.get("/",authMiddleware,getNotes);                              //handles the get/api/notes 
router.post("/",authMiddleware,createNote);                      //handles the post request post/api/notes
router.put("/:id",authMiddleware,updateNote);
router.delete("/:id",authMiddleware,deleteNote);
module.exports=router;                               //create a module of this so it can be used in other files
