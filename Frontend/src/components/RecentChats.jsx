import {React,useEffect} from 'react'
import useMessageStore from '../store/useMessageStore'
import { LoaderIcon } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import NoChatFound from './NoChatFound'


function RecentChats() {
  const {getChatPartner,isUserLoading,chatPartners,setSelectedUser} = useMessageStore() 
  const {onlineUsers} = useAuthStore()
  useEffect(()=>{
    getChatPartner()
  },[getChatPartner])

  if(isUserLoading) return <LoaderIcon />

  if(chatPartners.length === 0) return <NoChatFound />
  return (
   chatPartners.map((e)=>{
    

    return <div key={e._id} className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors' onClick={()=>{setSelectedUser(e)}}>
              <div className='flex items-center gap-3'>

                {/*It will decide which user is online and offline on the basic of onlineUser by socket.io*/}
                <div className={`avatar ${onlineUsers.includes(e._id)? "online" : "offline"}`}>
                  <div className='size-12 rounded-full'>
                    <img src={e.profilePic || "/Avatar.png"} alt="Profile" />
                  </div>
                </div>
                <h4 className='text-slate-200 font-medium truncate'>{e.userName}</h4>

                {/*It will decide which user is online and offline on the basic of onlineUser by socket.io*/}
                <div>{onlineUsers.includes(e._id)? "(Online)" : "(Offline)"}</div>
              </div>
           </div>
   })
  )
}

export default RecentChats