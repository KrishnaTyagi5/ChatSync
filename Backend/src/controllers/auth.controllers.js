import userModel from "../models/user.models.js"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import sendWelcomeEmail from "../emails/emailHandlers.emails.js"
import uploadProfilePicture from "../config/imagekit.js"




//It is login controller.
const login = async function (req,res){
    try{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const udata = req.body

    //First checking all fields are coming or not.
    if(!udata.email || !udata.password){
        return res.status(400).json({
            message : "please provide all entries"
        })
    }

    //Normalizing the email.
    const normalizedEmail = udata.email.trim().toLowerCase()
    
    
    //Performing email validation.
    if(!emailRegex.test(normalizedEmail)){
       return res.status(400).json({
            message : "please provide the valid email"
        })
    }

    //Checking user exists or not if yes comparing password by converting to hash.
    const existingUser = await userModel.findOne({email : normalizedEmail}).select("+password")
    if(!existingUser){
        return res.status(400).json({
            message : "Please register first"
        })
    }
    const result = await bcrypt.compare(udata.password , existingUser.password)
    if(!result){
        return res.status(400).json({
            message : "Invalid credentials"
        })
    }  
    
    //Checking for JWT_SECRET & NODE_ENV
    if(!process.env.JWT_SECRET || !process.env.NODE_ENV){
        throw new Error("JWT_SECRET or NODE_ENV not found")
    }

    //Generating Token
    const token = jwt.sign({_id : existingUser._id},process.env.JWT_SECRET,{expiresIn : "7d"})
    res.cookie("Token" , token ,{
        httpOnly:true,
        sameSite : "strict",
        secure : process.env.NODE_ENV === "development"?false:true,
        maxAge : 7*24*60*60*1000
    })


    res.status(200).json({
        message : "user logged in sucessfully",
        _id:existingUser._id,
        userName:existingUser.userName,
        email:existingUser.email,
        profilePic : existingUser.profilePic
    })
}
catch(error){
    console.error(`Error Occured ${error}`)
}
}



//It is register controller.
    const register = async function (req,res){
    try{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const udata = req.body

    //First checking all fields are coming or not.
    if(!udata.name || !udata.email || !udata.password){
        return res.status(400).json({
            message : "please provide all entries"
        })
    }
    
    
    //Normalizing the email.
    const normalizedEmail = udata.email.trim().toLowerCase()
    
    
    //Performing email validation.
    if(!emailRegex.test(normalizedEmail)){
       return res.status(400).json({
            message : "please provide the valid email"
        })
    }
    if(udata.password.length < 6 ){
       return res.status(400).json({
            message : "Password should contain atleast 6 character"
        })
    }
    //First checking the existing user.
    const existingUser = await userModel.findOne({email : normalizedEmail})
    if(existingUser)
    {
        return res.status(200).json({
            message : "User with this email already exists"
        })
    }

    //Hashing the password.
    const hashPass = await bcrypt.hash(udata.password,10)
    //Storing it to DB.
    const  newUser = await userModel.create({
        userName : udata.name,
        email : udata.email,
        password : hashPass
    })


    //First checking JWT_SECRET & NODE_ENV for token generation & sending.
    if(!process.env.JWT_SECRET || !process.env.NODE_ENV){
        throw new Error("JWT_SECRET or NODE_ENV not found")
    }

    
    //Generating token & sending into cookie.
    const token = jwt.sign({_id:newUser._id , email : normalizedEmail},process.env.JWT_SECRET,{expiresIn:"7d"})
      
    res.cookie("Token",token,{
        httpOnly : true, //It can be accessable only by HTTP not by JS.
        secure:process.env.NODE_ENV === 'development'?false:true,
        sameSite:"strict", //Prevent attacks.
        maxAge : 7*24*60*60*1000
    })
    


    //Sending the welcome email to client.
    // try{
    //    await sendWelcomeEmail(udata.name , udata.email , process.env.FrontendURL)
    // }
    // catch(error){
    //     console.error(`Error occured ${error}`)
    // }



    res.status(201).json({
        message : "User registered sucessfully , Check your email box (Welcome email)",
        _token : "token has sended to cookie keep it for stay authenticated",

        //Sending the user data to  frontend to update header and online status.
        user : newUser
    })
}
catch(error){
    console.error(`Error Occured ${error}`)
}
}



//It is logout controller.
const logout = (req,res)=>{
    const token = req.cookies.Token;

    //Checking token exists or not.
    if(!token){
        return res.json({
            message : "User is unauthenticated"
        })
    }
    res.clearCookie("Token").json({
        message : "User logged out sucessfully"
    })
}


//It is profile-update controller.
const profileUpdate = async(req,res)=>{
    //First checking for pic.
    if(!req.file) return res.status(400).json({message : "profile pic required"})
    //Uploading file to imagekit & getting object in response.
    const imgResult = await uploadProfilePicture(req.file.buffer.toString("base64"),req.file.fieldname)
    //Updating the existing user's profilePic's value and returning updated user.
    const updatedUser = await userModel.findByIdAndUpdate({_id:req.userID},{profilePic : imgResult.url},{returnDocument : "after"})
    res.json({
        message : "Profile picture updated",
        url : updatedUser.profilePic
    })
}



export {login,register,logout,profileUpdate}