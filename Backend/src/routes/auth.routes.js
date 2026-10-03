import express from "express"
const router = express.Router();
import {login,register,logout,profileUpdate} from "../controllers/auth.controllers.js"
import checkAuthentication from "../middlewares/auth.middlewares.js"
import upload from "../middlewares/fileUpload.middlewares.js"
import userModel from "../models/user.models.js";

//This is login route.
router.post('/login',login)

//This is register route.
router.post('/register',register)

//This is logout route.
router.post('/logout',logout)

//This is profile-update route.
                  //Flow           //Auth Middleware ->  //Multer converting to buffer ->
router.put('/profile-update',checkAuthentication,upload.single("profilePic"),profileUpdate)

//This is simple authentication route.
router.get('/check-first',checkAuthentication,async(req,res)=>{
    res.status(200).json({
        message : "Authorized User",
        user : await userModel.findOne({_id : req.userID})
    })
})

export default router