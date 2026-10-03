import { MessageCircleIcon } from "lucide-react"

{/*It is by default message shown on the left side of the chat page */}
function DefaultMessage() {
    return (
        <div className="flex-1 flex items-center justify-center">
            
            <div className="text-center">
                <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4"/>
                <h2 className="text-xl font-semibold">
                    No conversation selected
                </h2>

                <p>
                    Select a conversation from the sidebar to start chatting.
                </p>
            </div>

        </div>
    )
}

export default DefaultMessage