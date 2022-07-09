const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");
const sendToken = require("../Utils/jwtToken")
const User = require("../Model/UserModel");
// Register a User
exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const {name,email,password}= req.body;
    const user= await User.create({
        name,email,password,
        avatar:{
            public_id:"This is a sample id",
            url:"profilepicUrl"
        }
    });
    sendToken(user,201,res);
});
// login user
exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password}= req.body;
    // Checking if the user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(ErrorHandler("Invalid email or password"),401);
    }
    const isPasswordMatched = user.comparePassword(password);
    if(!isPasswordMatched){
        return next(ErrorHandler("Invalid email or password"),401);
    }
    sendToken(user,200,res);
});
// Logout User
exports.logout = catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged out",
    });
});