import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from "react-router-dom"
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import MessagePage from './pages/MessagePage'
import useAuthStore from './store/useAuthStore'
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

{/*These are the routes */}
function App() {

    const {
        checkingIsAuthenticated,
        authenticatedUser,
        checkAuthFunction
    } = useAuthStore();

    useEffect(() => {
        checkAuthFunction()
    }, [])

    if (checkingIsAuthenticated) {
        return <PageLoader />
    }

    return (
        <div className="min-h-screen bg-[#181818] relative flex items-center justify-center p-4 overflow-hidden">
           
            {/*All defined routes*/}
            <Routes>

                {/*This will redirect to the chat page */}
                <Route
                    path="/"
                    element={
                        authenticatedUser
                            ? <MessagePage />
                            : <Navigate to="/login" />
                    }
                />

                {/*This will redirect to the login page */}
                <Route
                    path="/login"
                    element={
                        !authenticatedUser
                            ? <LoginPage />
                            : <Navigate to="/" />
                    }
                />

                {/*This will redirect to the register page */}
                <Route
                    path="/register"
                    element={
                        !authenticatedUser
                            ? <SignupPage />
                            : <Navigate to="/" />
                    }
                />

            </Routes>

            <Toaster />

        </div>
    )
}

export default App