import React, { useEffect, useRef } from 'react'
import useMessageStore from '../store/useMessageStore'
import useAuthStore from '../store/useAuthStore'


{/*It is the actual area where we have the actual messages with the selected user  */}
function ConversationArea() {
    const {messages} = useMessageStore()
    const {authenticatedUser} = useAuthStore()
    const AutomaticallyBottomScrollingRef = useRef(null)

    useEffect(()=>{
        AutomaticallyBottomScrollingRef.current?.scrollIntoView()
    },[messages])

  return (
    <div className='max-w-3xl mx-auto space-y-6'>
        {messages.map((e)=>{
            if(e.senderID === authenticatedUser._id){
                return <div key={e._id} className='chat chat-end'>
                            <div className='chat-bubble relative bg-cyan-600 text-white'>
                                {e.image ? <img src={e.image} className="rounded-lg h-48 object-cover"/> : null}
                                {e.text ? <p className='mt-2'>{e.text}</p> : null}
                                {new Date(e.createdAt).toLocaleTimeString()}
                            </div>
                        </div>    
            }
            else{
                return <div key={e._id} className='chat chat-start'>
                            <div className='chat-bubble relative bg-cyan-600 text-white'>
                                {e.image ? <img src={e.image} className="rounded-lg h-48 object-cover"/> : null}
                                {e.text ? <p className='mt-2'>{e.text}</p> : null}
                                {new Date(e.createdAt).toLocaleTimeString()}
                            </div>
                        </div>
            }
        })}
        <div ref={AutomaticallyBottomScrollingRef}></div>
    </div>
  )
}

export default ConversationArea