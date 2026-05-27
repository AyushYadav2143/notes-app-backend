const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();
const noteRoutes=require("./routes/noteRoutes");
const app=express();

app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));
app.use("/api/notes",noteRoutes);
app.get("/",(req,res)=>{
    res.send("Server is running on port 5000");
});
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
const authRoutes=require("./routes/authRoutes");
app.use("/api/auth",authRoutes);

