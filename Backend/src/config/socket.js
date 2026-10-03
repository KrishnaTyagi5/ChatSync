import { Server } from "socket.io";
import http from "http"
import app from "../app.js"
import dotenv from "dotenv"
import checkSocketAuthentication from "../middlewares/socket.middlewares.js"

dotenv.config()

/*Here we have created a "Node HTTP Server" (actual HTTP server )and connecting our 
already created Express "app" (only express application request handler)to handle the 
http requests.

NOTE:- when we write "app.listen" only then it internally create a http server? Then
why we create actual http server bcz "Socket.io needs actual HTTP Server"

NOTE:- When an http request arrives it will pass to the "app"
*/


//Creating actual http server.
const server = http.createServer(app)


/*Here Socket.io server is created and "server" passed to it bcz now Socket.io server 
 and express server are connected to the actual HTTP Server. 
*/
const io = new Server(server,{
    cors:{
        origin : process.env.FrontendURL,
        credentials :true
    }
})


//first checking the socket authentication here. Similar to express middleware
io.use(checkSocketAuthentication)


//This object will store the online users.
const userSocketMap = {};


//It will return the socketid of the receiver.
function getReciverSocketId(reciverId){
    return userSocketMap[reciverId]
}


/*"connected" :- This should be strictly same in frontend also.
    This will run when anew user connects.
*/
io.on("connection",(socket)=>{
    
    console.log("SOCKET CONNECTED")
    console.log("Socket ID:", socket.id)
    console.log("User ID:", socket.userID)


    /*Here we are adding the user(which is Online) to the object (contains online users)
      Here we can access the userID as we added that in middleware.*/
    userSocketMap[socket.userID] = socket.id

    //This "onlineUsers" should also be same in frontend also.
    //It will send the all user.id present in the object(which are online) to other user
    io.emit("onlineUsers",Object.keys(userSocketMap))

    console.log("user connected")


    /*This "disconnected" should also be same in frontend also.
    It will run when a user disconnected.
NOTE:- socket.io will listen any event in backend from client and vice varsa.
    */
    socket.on("disconnect",()=>{

    //deleting that user from object
    delete userSocketMap[socket.userID]

    //Again sending the updated user id from object to other users.
    io.emit("onlineUsers",Object.keys(userSocketMap))

    console.log("user disconnected")
})
})


export {server,getReciverSocketId,io}


