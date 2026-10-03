import multer from "multer"



const upload = multer(
    {
        storage : multer.memoryStorage()
    }
)//It will read file and convert into some object which contain buffer(Actual file data).


export default upload