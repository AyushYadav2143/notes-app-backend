const Note=require("../models/Note");
const getNotes=async(req,res)=>{
    try{
        const notes=await Note.find({
            user:req.user.id
        });
        res.json(notes);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const createNote=async(req,res)=>{
    try{
        const{title,content}=req.body;
        const note=await Note.create({
            title,
            content,
            user:req.user.id
        });
    }
    catch(error){
        res.status(500).json(note)({
            message:error.message
        });
    }
};
const updateNote=async(req,res)=>{
    try{
        const{title,content}=req.body;
        const updateNote=await Note.findByIdAndUpdate(
            req.params.id,{
                title,
                content
            },
            {
                new:true
            }
            
        );
        res.json(updateNote);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const deleteNote=async(req,res)=>{
    try{
        await Note.findByIdAndDelete(req.params.id);
        res.json({
            message:"Note deleted successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
module.exports={
    getNotes,
    createNote,
    updateNote,
    deleteNote
};