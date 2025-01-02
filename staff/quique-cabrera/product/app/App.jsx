
const { useState } = React

function App() {
    const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : 'landing')

    console.log('App --> render')

    const handleRegisterCliked = () => setView('register')

    const handleLoginClicked = () => setView('login')

    const handleLoggedIn = () => setView('home')

    const handleUserRegistered = () => setView('login')

    const handleUserLoggedOut = () => setView('login')

    return <>
        <h1>Hola, App!</h1>

        {view === 'landing' && <Landing onRegisterClicked={handleRegisterCliked} onLoginClicked={handleLoginClicked} />}
        {view === 'login' && <Login onRegisterClicked={handleRegisterCliked} onUserLoggedIn={handleLoggedIn} />}
        {view === 'register' && <Register onLoginClicked={handleLoginClicked} onUserRegistered={handleUserRegistered} />}
        {view === 'home' && <Home onUserLoggedOut={handleUserLoggedOut} />}
    </>
}