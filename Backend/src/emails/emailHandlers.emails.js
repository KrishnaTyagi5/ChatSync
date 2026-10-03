import {sender,resendClient} from "../config/resend.js"


/*The actual function which will send email.
Accepting recently registered user's name and email*/
const sendWelcomeEmail = async (name,email,frontendURL) => {
   try{
   const data = await resendClient.emails.send({
        from : `${sender.name} <${sender.email}>`,
        to : "krishnatyagi2539@gmail.com",
        subject : 'Welcome to ChatSync',
        html : `<div style="margin : 15px">
        <h1 style="margin:10px ; padding:10px ; text-align:center ; overflow:hidden"> Welcome to ChatSync ${name}! </h1>
        <p style="margin:10px,0px,30px,0px ; padding:10px ; font-size:15px ; font-weight:bold ; border: 2px solid black ; border-radius:8px ; color:white ; background-color:#2596be"> We are very happy to have you onboard . Please click below to get started </p>
        <a href="${frontendURL}" style="text-align:center ; font-size:15px ; padding:10px ; margin-left:95px ; border:2px solid black ; border-radius:8px ">Lets Go</a>
        </div>`
    })
}
catch(error){
    console.error(error);
}
}

export default sendWelcomeEmail