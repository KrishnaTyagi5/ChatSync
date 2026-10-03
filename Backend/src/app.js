import express from "express"
import  authroutes from"./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import msgRoute from "./routes/message.routes.js"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config()


const app = express();

app.use(cors({origin : process.env.FrontendURL , credentials : true}))
app.use(express.json()) //To make req.body working to get data.
app.use(cookieParser()) //To send token in cookie.


//It connect all authentication related route present in authroutes.
app.use("/api/auth",authroutes)
app.use("/api/message",msgRoute)



export default app