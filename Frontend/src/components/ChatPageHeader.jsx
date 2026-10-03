import React from 'react'
import useMessageStore from '../store/useMessageStore'
import { XIcon } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'


{/*It is the right-top part of the message page  */}
function ChatPageHeader() {
    const {selectedUser,setSelectedUser} = useMessageStore()
    const {onlineUsers} = useAuthStore()


  return (
    <div className='flex justify-between items-center bg-slate-800/50 border-b 
    border-slate-700/50 max-h-[84px] px-6 flex-1'>
        <div className='flex items-center space-x-3'>

            {/*It will decide which user is online and offline on the basic of onlineUser by socket.io*/}
            <div className={`avatar ${onlineUsers.includes(selectedUser._id)? "online": "offline"}`}>
                <div className='w-12 rounded-full'>
                    <img src={selectedUser.profilePic || "Avatar.png"} alt="profile" />
                </div>
            </div>

            {/*UserName and offline-online status */}
            <div>
                <h3 className='text-slate-200 font-medium'>{selectedUser.userName}</h3>
                <span>{`${onlineUsers.includes(selectedUser._id)? "online":"offline"}`}</span>
            </div>
        </div>

        {/*It will remove the selected user from chat area */}
        <button onClick={()=>{setSelectedUser(null)}}>
            <XIcon />
        </button>
    </div>
  )
}

export default ChatPageHeader