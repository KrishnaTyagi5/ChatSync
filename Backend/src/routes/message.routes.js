import express from "express"
const router = express.Router();
import {getAllContacts,getRecentChatPartners,getChatsOfID,sendChatsToID} from "../controllers/message.controllers.js"
import checkAuthentication from "../middlewares/auth.middlewares.js"
import upload from "../middlewares/fileUpload.middlewares.js"


router.get('/totalcontacts',checkAuthentication,getAllContacts)
router.get('/recentchats',checkAuthentication,getRecentChatPartners)
router.get('/getchats/:id',checkAuthentication,getChatsOfID)
router.post('/sendchats/:id',checkAuthentication,upload.single("file"),sendChatsToID)



export default router