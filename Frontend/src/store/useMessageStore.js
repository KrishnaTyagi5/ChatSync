import { create } from "zustand";
import axiosInstance from "../config/axios";
import toast from "react-hot-toast";
import useAuthStore from './useAuthStore'


const useMessageStore = create((set,get)=>({
    allContacts : [],
    chatPartners : [],
    messages : [],
    activeTabs : "Chats",
    selectedUser : null,
    isUserLoading : true,
    isMessagesLoading : false,
    setActiveTab : (tab) =>{
        set({activeTabs : tab})
    },
    setSelectedUser : (user)=>{
        set({selectedUser : user})
    },
    getAllContacts :async ()=>{
        try{
        const actualContactArray = await axiosInstance.get('/message/totalcontacts')
            set({allContacts : actualContactArray.data.total})
        }
        catch{
            toast.error(error.response?.data?.message)
        }
        finally{
            set({isUserLoading : false})
        }
    },
    getChatPartner : async()=>{
        try{
            const actualChatPartner = await axiosInstance.get('/message/recentchats')
            set({chatPartners : actualChatPartner.data.total})
        }
     catch(error){
        toast.error(error.response?.data?.message)
     }
     finally{
        set({isUserLoading :false})
     }
    },
    getMessageById : async(oppositeUserId)=>{
        set({isMessagesLoading : true})
        try {
            const messageData= await axiosInstance.get(`/message/getchats/${oppositeUserId}`)
            set({messages : messageData.data.total})
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
        finally{
            set({isMessagesLoading : false})
        }
    },
sendMessagesById: async (messageDataInFormFormat) => {

    const { selectedUser, messages } = get()
    const { authenticatedUser } = useAuthStore.getState()

    //It is outside the try bcz first of all show the sended message on screen(immediately)
    const temp_id = `temp-${Date.now()}`

    //Getting the image file from form by get()
    const imageFile = messageDataInFormFormat.get("profilePic")

    //Creating the optimistic message.
    const optimisticMessage = {
        _id: temp_id,
        senderID: authenticatedUser._id,
        reciverID: selectedUser._id,
        text: messageDataInFormFormat.get("text"),
        image: imageFile
            ? URL.createObjectURL(imageFile)
            : null,
        createdAt: new Date().toISOString()
    }

    //This helps to show message immediately
    set({
        messages: [...messages, optimisticMessage]
    })

    try {

        const result = await axiosInstance.post(
            `/message/sendchats/${selectedUser._id}`,
            messageDataInFormFormat
        )

        // NOTE:Get the current/latest messages from Zustand
        const currentStore = get()
        const latestMessages = currentStore.messages

        set({
            messages: latestMessages.map((e) => {

                if (e._id === temp_id) {
                    return result.data.message
                }

                return e
            })
        })

    } catch (error) {

        console.log("SEND MESSAGE ERROR:", error)

        const currentStore = get()
        const latestMessages = currentStore.messages

        set({
            messages: latestMessages.filter(
                (e) => e._id !== temp_id
            )
        })

        toast.error(
            error.response?.data?.message ||
            "Something Went Wrong"
        )
    }
},
    listenToMessage : ()=>{
        const {selectedUser} = get()
        if(!selectedUser) return

        const {socket} = useAuthStore.getState()

        socket.on("newMessage",(newMessage)=>{

            /*Here we are checking that the message sender Id and seleted user id are same or
            not bcz if online user sended a message and another user which is online selected 
            user which is offline , the message will show on the conversation area of the offline
            user. */ 
            const isMessageSendedFromSelectedUser = newMessage.senderID === selectedUser._id
            if(!isMessageSendedFromSelectedUser) {
                return
            }
            const {messages} = get()
            set({messages : [...messages,newMessage]})
        })
    },
    noListenToMessage :() =>{
        const {socket} = useAuthStore.getState()
        socket.off("newMessage")
    }
}))

export default useMessageStore