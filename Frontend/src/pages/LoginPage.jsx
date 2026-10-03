import {LoaderIcon, MailIcon, MessageCircleIcon, LockIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { useState } from 'react'


{/*This login page implementation */}
function LoginPage() {
  const [formData, setformData] = useState({email : "",password : ""})
  const {isLoggingIn,loginFunction} = useAuthStore()

  {/*This is the actual fun which will send the data to backend */}
  function login(e){
    e.preventDefault()
    console.log("LOGIN DATA:", formData);
    loginFunction(formData)
  }

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4 bg-[#181818]">
            <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
                 <div className="w-full flex flex-col md:flex-row">

                    {/*Formleft side*/}
                   <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
                    <div className="w-full max-w-md">

                    {/* HEADING TEXT */}
                    <div className="text-center mb-8">
                    <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-200 mb-2">Login Account</h2>
                    <p className="text-slate-400">Welcome Back!</p>
                </div>


                {/*Form will accept the data and send it to backend on submit. */}
                <form onSubmit={login} className="space-y-6">
                <div>
                <label className="auth-input-label">Email</label>
                <div className="relative">
                <MailIcon className="auth-input-icon" />

                {/*Here this will accept the email & ...fromData will keep same other form data only change the email */}
                            <input
                                className="input"
                                type="email"
                                value={formData.email}
                                placeholder="Enter Your Email"
                                onChange={(e) =>
                                    setformData({
                                        ...formData,
                                        email: e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>
                

                {/*Here this will accept the password & ...fromData will keep same other form data only change the password*/}
                <div>
                <label className="auth-input-label">Password</label>
                <div className="relative">
                <LockIcon className="auth-input-icon" />
                            <input
                                className="input"
                                type="text"
                                value={formData.password}
                                placeholder="Enter Your Password"
                                onChange={(e) =>
                                    setformData({
                                        ...formData,
                                        password: e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn
                            ? (<LoaderIcon className="w-full h-5 animate-spin text-center"/>)
                            : ("Login Account")
                        }
                    </button>
                </form>



                {/*This will redirect to register page */}
                <div className="mt-6 text-center">
                    <Link to="/register" className="auth-link">
                        Don't Have Account? Register
                    </Link>
                </div>
            </div>
         </div>


        {/*Form right side - image*/}
        <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
            <div>
                <img
                     src="/Login.png"
                     alt="People using mobile devices"
                     className="w-full h-auto object-contain"
                />
            <div className="mt-6 text-center">
                <h3 className="text-xl font-medium text-cyan-400">
                 We are Glad To See You
                </h3>
                <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">
                        Private
                    </span>
                    <span className="auth-badge">
                     Easy Setup
                    </span>
                    <span className="auth-badge">
                        Lets....Go
                    </span>
                    </div>
                 </div>
            </div>
        </div>
    </div>
</div>
</div>
);
}

export default LoginPage