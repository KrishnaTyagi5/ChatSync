import React from 'react'
import useMessageStore from '../store/useMessageStore'
import ActiveTab from '../components/ActiveTab'
import ProfileHeader from '../components/ProfileHeader'
import RecentChats from '../components/RecentChats'
import AllUsers from '../components/AllUsers'
import ChatContainedArea from '../components/ChatContainedArea'
import DefaultMessage from '../components/DefaultMessage'

function MessagePage() {

    const { activeTabs, selectedUser } = useMessageStore();

    return (
        <div className="relative w-full max-w-6xl h-[800px] flex overflow-hidden rounded-lg">

            {/* LEFT SIDE- which will show thw profile area, active tabs, lists*/}
            <div className="w-80 flex-shrink-0 bg-slate-800/50 backdrop-blur-sm flex flex-col">

                <ProfileHeader />

                <ActiveTab />

                {/*It will show the recent chats if "Chats" is selected otherwise all contacts*/}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {activeTabs === "Chats"
                        ? <RecentChats />
                        : <AllUsers />
                    }
                </div>
            </div>


            {/* RIGHT SIDE - which will show the selected user*/}
            <div className="flex-1 min-w-0 flex flex-col bg-slate-900/50 backdrop-blur-sm">
                {selectedUser
                    ? <ChatContainedArea />
                    : <DefaultMessage />
                }
            </div>
        </div>
    );
}

export default MessagePage