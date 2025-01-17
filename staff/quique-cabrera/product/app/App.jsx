
import { useState } from 'react'

import logic from './logic'

import Landing from './view/Landing'
import Login from './view/Login'
import Register from './view/Register'
import Home from './view/Home'

function App() {
    const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : 'landing')

    console.log('App --> render')

    const handleRegisterCliked = () => setView('register')

    const handleLoginClicked = () => setView('login')

    const handleLoggedIn = () => setView('home')

    const handleUserRegistered = () => setView('login')

    const handleUserLoggedOut = () => setView('login')

    return <>
        {view === 'landing' && <Landing onRegisterClicked={handleRegisterCliked} onLoginClicked={handleLoginClicked} />}
        {view === 'login' && <Login onRegisterClicked={handleRegisterCliked} onUserLoggedIn={handleLoggedIn} />}
        {view === 'register' && <Register onLoginClicked={handleLoginClicked} onUserRegistered={handleUserRegistered} />}
        {view === 'home' && <Home onUserLoggedOut={handleUserLoggedOut} />}
    </>
}

export default App