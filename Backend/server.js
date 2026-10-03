import {server} from "./src/config/socket.js";
import dotenv from "dotenv"
dotenv.config()
import  connectDB from "./src/config/db.config.js"



//Database is connecting.
connectDB();


//Checking PORT first.
if(!process.env.PORT){
    throw new Error("PORT not found")
}

//Server is starting here.
server.listen(process.env.PORT || 8080,()=>{
    try{
    console.log(` server is running on port ${process.env.PORT}.`)
    }
    catch{
        console.log("Error occured");
    }
})