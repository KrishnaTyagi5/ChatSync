import jwt from "jsonwebtoken"
import userModel from "../models/user.models.js"
import dotenv from "dotenv"
dotenv.config()

//It checks does this user is valid authenticated user.
async function checkSocketAuthentication(socket,next){

    /*NOTE:- This above (socket) is created by the Socket.io when a user is connected.
        contains "handshake,  IMP(socketid)  and other socket data".
    */
    let decoded;
    try {

        //First extract the token from http-only cookie.
        //NOTE:- (formate? why we use these lines)
        const token = socket.handshake.headers.cookie
        ?.split(";")
        .find((row)=>(row.startsWith("Token=")))
        ?.split("=")[1]

        //Checking the token exists or not.
        //"next" is used to throw error
        if(!token){
            return next(new Error("Unauthorized"))
        }

        //after the verification we get the userid
        try{
          decoded = jwt.verify(token,process.env.JWT_SECRET)
        }
        catch(error){
            next(new Error("Unauthorized"))
        }
        
        //Checking the user existance.
        const user = await userModel.findById({_id : decoded._id})
        if(!user){
            return next(new Error("User not exists"))
        }

        /*Here we are adding the new field as socket.userID which contains the authenticated
        userid which helps in identifying this socket.id belongs to which user
        (like same as req.body = user_id)*/
        socket.userID = decoded._id

        //Telling go to next part.
        next()
    } catch (error) {
        next(new Error("Authentication failed"))
    }
}



export default checkSocketAuthentication