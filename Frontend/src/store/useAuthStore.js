import {create} from "zustand"
import axiosInstance from "../config/axios"
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL = import.meta.env.VITE_BACKEND_URL
                            //If i am using set(),get() both inside store then both
                            //should be written inside create((set,get))
const useAuthStore = create((set,get)=>({
    authenticatedUser : null,
    checkingIsAuthenticated : true,
    isSigningUp : false,
    isLoggingIn : false,
    isLoggingOut : false,
    socket : null,
    onlineUsers : [],
    checkAuthFunction : async ()=>{
        try{
        const result = await axiosInstance('/auth/check-first')
        set({authenticatedUser : result.data.user})
        get().connectSocket();
        }
        catch(error){
            set({authenticatedUser : null})
        }
        finally{
            set({checkingIsAuthenticated : false})
        }
    },
    signingUpFunction : async (data)=>{
        set({isSigningUp : true})
        try{
        const result = await axiosInstance.post("/auth/register",data)
        const actualData = result.data.user
        set({authenticatedUser : actualData})
        toast.success("Hey ! Your account has been created")
        get().connectSocket()
        }
        catch(error){
            toast.error(error.response.data.message || "Something went wrong")
            set({authenticatedUser : null})
        }
        finally{
            set({isSigningUp :false})
        }
    },
    loginFunction : async (data)=>{
        set({isLoggingIn : true})
        try {
            const result = await axiosInstance.post('/auth/login',data)
            set({authenticatedUser : result.data})
            toast.success("User loggediIn sucessfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
            set({authenticatedUser : null})
        }
        finally{
            set({isLoggingIn : false})
        }
    },
    logout : async ()=>{
        set({isLoggingOut : true})
        try{
        await axiosInstance.post('/auth/logout')
        toast.success("User logged out successfully")
        set({authenticatedUser : null})
        get().disconnectSocket()
        }
        catch(error){
            toast.error(error.response.data.message || "Something went wrong")
        }
        finally{
            set({isLoggingOut : false})
        }
    },
    updateProfile : async(dataInForm)=>{
        try{
        const result = await axiosInstance.put('/auth/profile-update',dataInForm)
        const url = result.data.url
        toast.success("Profile Updated")
        return url
        }
        catch(error)
        {
            toast.error(error.response.data.message || "Something went wrong")
        }
    },

    /*we will call this function on login and register time so that it can add to online
    user array*/
    connectSocket : ()=>{
        const {authenticatedUser} = get()
        if(!authenticatedUser || get().socket?.connected){
            return
        }

        const socket = io(BASE_URL,{
            withCredentials : true
        })

        set({socket : socket})

        //listen for online user event.
        socket.on("onlineUsers",(onlineUserIDs)=>{
            console.log("Online users:", onlineUserIDs)
            set({onlineUsers : onlineUserIDs})
        })
    },
    disconnectSocket: ()=>{
       if(get().socket?.connected)
        {
            get().socket?.disconnect()
        }
    }
}))



export default useAuthStore