const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const{PutObjectCommand}=require("@aws-sdk/client-s3");
const s3=require("../config/s3");
const{v4:uuidv4}=require("uuid");
const registerUser=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:"User already exists"
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,
            email,password: hashedPassword
        });
        const token=jwt.sign(
            {
                id:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );
        res.status(201).json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                profilePic:user.profilePic
            }
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }
        const isMatch=await bcrypt.compare(
            password,
            user.password
        );
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }
        const token=jwt.sign(
            {
            id:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );
        res.status(200).json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                profilePic:user.profilePic
            }
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const uploadProfilePicture=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                message:"No file uploaded"
            });
        }
        const file=req.file;
        const fileName = `profile-pictures/${uuidv4()}-${file.originalname}`;
        const params={
            Bucket:process.env.AWS_BUCKET_NAME,
            Key:fileName,
            Body:file.buffer,
            ContentType:file.mimetype
            
        };
        await s3.send(
            new PutObjectCommand(params)
        );
        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        const user=await User.findByIdAndUpdate(
            req.user.id,
            {
                profilePic:imageUrl
            },
            {new:true}
        );
        res.status(200).json({
            message:"Profile picture uploaded successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                profilePic:user.profilePic
            }
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const getProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
module.exports={
    registerUser,
    loginUser,
    uploadProfilePicture,
    getProfile
};