import dotenv from "dotenv"
dotenv.config()
import {Resend} from "resend"


//First check the environment variable.
if(!process.env.RESEND_API_KEY){
    throw new Error("Please provide RESEND API KEY")
}


//Creating the Resend class object by passing secret key to communicate with Resend.
const resendClient = new Resend(process.env.RESEND_API_KEY)


//Simple JS object contains email sender info.
const sender = {
    email : process.env.EMAIL_FROM,
    name : process.env.EMAIL_FROM_NAME
}



export {sender,resendClient}