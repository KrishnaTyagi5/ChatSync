import ImageKit from "@imagekit/nodejs"

//Setting up imagekit via a IMAGEKIT_PRIVATE_KEY.
const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

//The actual function uploading the image.
const uploadProfilePicture = async (buffer,profilePicture)=>{
    const result = await imagekit.files.upload({
        file : buffer,
        fileName : profilePicture
    })
    console.log("IMAGEKIT RESULT:", result)
    return result
}




export default uploadProfilePicture