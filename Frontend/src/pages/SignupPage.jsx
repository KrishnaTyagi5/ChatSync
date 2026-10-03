import { LoaderIcon, LockIcon, MailIcon, MessageCircleIcon, UserIcon } from 'lucide-react'
import { useState } from "react"
import useAuthStore from '../store/useAuthStore'
import { Link } from 'react-router-dom'

{/*This is register page implementation */}
function SignupPage() {

    const { signingUpFunction, isSigningUp } = useAuthStore()

    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: ""
    })

    {/*This function will send the data to the backend */}
    function formSubmit(e) {
        e.preventDefault()
        console.log("FORM DATA:", formData)
        signingUpFunction(formData)
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
                    <h2 className="text-2xl font-bold text-slate-200 mb-2">Create Account</h2>
                    <p className="text-slate-400">SignUp for a new account</p>
                </div>
                
                {/*On submit send the data to the above function */}
                <form onSubmit={formSubmit} className="space-y-6">
                <div>
                <label className="auth-input-label">Full Name</label>
                <div className="relative">
                <UserIcon className="auth-input-icon" />

                            {/*It will take the user name & ...formData will keep the other fields data same except userName*/}
                            <input
                                className="input"
                                type="text"
                                value={formData.name}
                                placeholder="Enter Your Name"
                                onChange={(e) =>
                                    setformData({
                                        ...formData,
                                        name: e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>

                <div>
                <label className="auth-input-label">Email</label>
                <div className="relative">
                <MailIcon className="auth-input-icon" />
                            {/*It will take the user email & ...formData will keep the other fields data same except userEmail*/}
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

                <div>
                <label className="auth-input-label">Password</label>
                <div className="relative">
                <LockIcon className="auth-input-icon" />

                            {/*It will take the user password & ...formData will keep the other fields data same except userPassword*/}
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
                        disabled={isSigningUp}
                    >
                        {isSigningUp
                            ? (<LoaderIcon className="w-full h-5 animate-spin text-center"/>)
                            : ("Create Account")
                        }
                    </button>
                </form>

                {/*It will redirect to login page*/}
                <div className="mt-6 text-center">
                    <Link to="/login" className="auth-link">
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>

        {/*Form right side - image*/}
        <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
        <div>
         <img
            src="/SignUp.png"
            alt="People using mobile devices"
            className="w-full h-auto object-contain"
        />
        <div className="mt-6 text-center">
            <h3 className="text-xl font-medium text-cyan-400">
                Start Your Journey Today
            </h3>
            <div className="mt-4 flex justify-center gap-4">
                <span className="auth-badge">
                    Free
                </span>
                <span className="auth-badge">
                    Easy Setup
                </span>
                <span className="auth-badge">
                    Private
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

export default SignupPage