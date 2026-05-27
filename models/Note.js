

const mongoose=require("mongoose");
const noteSchema=new mongoose.Schema({//github issue
    title:{
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        REF:"User",
        required:true
    }
},{
    timestamps:true


});
module.exports=mongoose.model("Note",noteSchema);