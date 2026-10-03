import mongoose from "mongoose"


//This is userSchema stored in DB
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})


// It is userModel
const userModel = mongoose.model("User",userSchema)



export default userModel;