import { useEffect, useState } from 'react'

import logic from './logic'

import Landing from './view/Landing'
import Login from './view/Login'
import Register from './view/Register'
import Home from './view/Home'

import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'

function App() {
    const navigate = useNavigate()
    const location = useLocation()

    let viewInPath = location.pathname.slice(1)
    if (viewInPath !== 'landing' && viewInPath !== 'register' && viewInPath !== 'login')
        viewInPath = 'landing'

    const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : viewInPath)


    console.log('App -> render')

    const handleRegisterCliked = () => setView('register')

    const handleLoginClicked = () => setView('login')

    const handleLoggedIn = () => setView('home')

    const handleUserRegistered = () => setView('login')

    const handleUserLoggedOut = () => setView('login')

    useEffect(() => {
        switch (view) {
            case 'landing':
                navigate('/landing')
                break
            case 'register':
                navigate('/register')
                break
            case 'login':
                navigate('/login')
                break
            case 'home':
                navigate('/')
                break
        }
    }, [view])

    return <Routes>
        <Route path="/landing" element={
            logic.isUserLoggedIn() ? <Navigate to="/" /> : <Landing onRegisterClicked={handleRegisterCliked} onLoginClicked={handleLoginClicked} />
        } />

        <Route path="/login" element={
            logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onRegisterClicked={handleRegisterCliked} onUserLoggedIn={handleLoggedIn} />
        } />

        <Route path="/register" element={
            logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClicked={handleLoginClicked} onUserRegistered={handleUserRegistered} />
        } />

        <Route path="/*" element={
            logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to="/landing" />
        } />
    </Routes>
}

export default App