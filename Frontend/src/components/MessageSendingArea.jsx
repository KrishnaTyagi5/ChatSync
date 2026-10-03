import React, { useRef,useState } from 'react'
import useMessageStore from '../store/useMessageStore'
import { ImageIcon, SendIcon } from 'lucide-react'
import toast from 'react-hot-toast'

{/*This is the actual part where we send messages(text or image) */}
function MessageSendingArea() {
  const {sendMessagesById} = useMessageStore()
  const [text, settext] = useState("")
  const [imagePreview, setimagePreview] = useState(null)
  const fileRef = useRef(null)

{/*This function accept the message(text,image,both) ! First it converts the data into form 
  format */}
function handleFormSubmit(e){
    e.preventDefault()
    const formData = new FormData()

    {/*If image is selected then first check its file size and then append to formData */}
    if(imagePreview){
      if(imagePreview.size > 5*1024*1024){
        toast.error("Please select the file under 4MB")
        return
      }
      else{
      
      {/*This "file" should be same as in the multer filed name otherwise it will give error */}
      formData.append("file",imagePreview)
      }
    }

    {/*If text is selected then simply add the text. */}
    if(text)
    {
    formData.append("text",text)
    }
    
    if(imagePreview || text)
    {
      sendMessagesById(formData)
    }
    settext("")
    setimagePreview(null)
    if(fileRef.current) fileRef.current.value = null
  }


  return (
    <div className='p-4 border-t border-slate-700/50'>
       <form onSubmit={handleFormSubmit} className='max-w-3xl mx-auto flex space-x-4'>

        {/*It will take the text message*/}
        <input type="text" 
                placeholder='Type your message...'
                value={text}
                onChange={(e)=>{settext(e.target.value)}}
                className='flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4'/>


        {/*It will take the image(file) type message */}
        <input type="file"
                ref={fileRef}
                accept='image/*'
                className="hidden"
                onChange={(e)=>{setimagePreview(e.target.files[0])}}/>

        {/*This file input is hidden behind the this button */}
        <button type="button" onClick={()=>{fileRef.current.click()}}
          className='bg-slate-800/50 text-slate-700 hover:text-slate-200 rounded-lg px-4 transition-colors'>
          <ImageIcon className='w-5 h-5'/>
        </button>


        {/*This will only work if one of the text is selected */}
        <button type='submit' disabled={!text && !imagePreview}>
          <SendIcon />  
        </button>

        </form> 
    </div>
  )
}

export default MessageSendingArea