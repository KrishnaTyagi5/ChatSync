import mongoose from "mongoose";



// First checking for environment variable
if (!(process.env.DB_String)) {
    throw new Error("Provide DB string first");
}


//Actual function of DB connection.
async function connectDB(){
    try{
    await mongoose.connect(process.env.DB_String)
    console.log("Database sucessfully connected. ")
    }
    catch(error){
        console.error("Error occured",error);
    }
}


export default connectDB