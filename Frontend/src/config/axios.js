import axios from "axios"
const axiosInstance = axios.create({
                //In vite fontend we access the env varaibles like this
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    withCredentials: true
})

{/*This instance has been created because during the development the url is different 
    during the production the url is different so we dont need to change it everywhere every time*/}
    
export default axiosInstance