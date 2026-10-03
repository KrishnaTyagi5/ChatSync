import mongoose from "mongoose";

//Creating message schema.
const messageSchema = new mongoose.Schema({
    senderID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    reciverID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text : {
        type : String,
        trim : true,
        maxlength : 2000
    },
    image : {
        type : String
    }
},{timestamps :true})

//Creating message model
const messageModel = mongoose.model("Message",messageSchema)



export default messageModel