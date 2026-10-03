import jwt from "jsonwebtoken"

//Checking user is loggedin or registered before accessing features.
const checkAuthentication = (req,res,next)=>{
    const token = req.cookies.Token
    if(!token){
      return  res.status(401).json({
            message : "Unauthorized access - No token"
        })
    }
    try{
    //If verified , will return Object otherwise error.
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    //Adding new field to req.
        req.userID = decoded._id
        next()
    }
    catch(error){
        res.status(401).json({
            message : "Invalid token"
        })
    }
}


export default checkAuthentication