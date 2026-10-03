import mongoose, { set } from "mongoose"
import userModel from "../models/user.models.js"
import messageModel from "../models/message.models.js"
import uploadProfilePicture from "../config/imagekit.js"
import {io,getReciverSocketId} from "../config/socket.js"


//It is to show the list of total people except self.
const getAllContacts = async (req,res)=>{
    try {
    const actualUserID = req.userID
    const contactResult = await userModel.find({_id : {$ne : actualUserID }})
    res.status(201).json({
        total : contactResult
    })
    }
    catch (error) {
        console.error(`Error occured ${error}`)
    }
}



//It will show the list of people with with actually had chat.
const getRecentChatPartners = async (req,res)=>{
    const loggedInUserID = req.userID
    const allMessages = await messageModel.find({
    $or: [
        { senderID: loggedInUserID },
        { reciverID: loggedInUserID }
    ]
    })
    const newRecentChatedContact = allMessages.map((val)=>{
        if(val.senderID.toString() === loggedInUserID){
            return val.reciverID.toString()
        }
        else{
            return val.senderID.toString()
        }
    })
    const set = new Set(newRecentChatedContact)
    const newArray = [...set]
    const totalRecentChatedUser = await userModel.find({_id: {$in : newArray}}) 
    res.status(200).json({
         total : totalRecentChatedUser
    })
}


//It will give the all chats with the given particular user'id.
const getChatsOfID = async (req,res)=>{
    try{
        const totalChats = await messageModel.find({
            $or : [
                {senderID : req.userID , reciverID : req.params.id},
                {senderID : req.params.id , reciverID : req.userID}
            ]
        })
        res.status(200).json({
            total : totalChats
    })
    }
    catch(error){
        console.error(`Error Occured ${error}`)
    }
}


//It will send the chats to given user'id , it can be text or file(img,video).
const sendChatsToID = async (req,res)=>{
    const text = req.body.text
    const _file = req.file
    if(!text && !_file) return res.json({message : "Data required to send chats"}) 

    //Here it is working as sending img , video chat to cloud.
    let fileURL
    if(_file){
      const _fileData  = await uploadProfilePicture(req.file.buffer.toString("base64"),req.file.fieldname)
      fileURL = _fileData.url
      console.log(fileURL)
    }

    //Creating the new message.
    const sendedMessage = await messageModel.create({
       senderID : req.userID,
       reciverID : req.params.id,
       text : text, 
       image : fileURL
    }) 
    console.log(sendedMessage)

    //Here we are getting the reciving user socketID
    const scoketID = getReciverSocketId(req.params.id)
    if(scoketID){

        //Here we are using to() because we want to send message to selected user not to all.
        io.to(scoketID).emit("newMessage",sendedMessage)
    }
    res.json({
        message : sendedMessage
    })
    }

export {getAllContacts,getRecentChatPartners,getChatsOfID,sendChatsToID}