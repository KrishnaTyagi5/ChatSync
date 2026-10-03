import React, { useEffect } from 'react'
import useMessageStore from '../store/useMessageStore'
import ChatPageHeader from './ChatPageHeader'
import ConversationArea from './ConversationArea'
import MessageSendingArea from './MessageSendingArea'
import { LoaderIcon } from 'lucide-react'


{/*It is the right side of the chatPage */}
function ChatContainedArea() {
  const {selectedUser,getMessageById,messages,isMessagesLoading,listenToMessage,noListenToMessage} = useMessageStore()
  useEffect(()=>{
    getMessageById(selectedUser._id)
    listenToMessage()

    return (()=> noListenToMessage())
  },[selectedUser,getMessageById,listenToMessage,noListenToMessage])

  {/*It has 3 segments */}
  return(
    <>
    {/*It will show the header part only */}
    <ChatPageHeader />

    {/*It will show the messages if available otherwise default message */}
    <div className='flex-1 px-6 overflow-y-auto py-8'>
      {isMessagesLoading ? <LoaderIcon /> : messages.length !== 0 ? <ConversationArea /> : <div className="flex-1 flex items-center justify-center"><h2>No conversation with {selectedUser.userName}</h2></div>}
    </div>

    {/*It is the message sending area where we actually send the message(image or text) */}
      <MessageSendingArea />
    </>
  )
}

export default ChatContainedArea