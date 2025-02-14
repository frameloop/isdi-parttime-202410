import './Landing.css'

function Landing({ onRegisterClicked, onLoginClicked }) {
    console.log('Landing --> render')

    const handleRegisterLinkClick = event => {
        event.preventDefault()

        onRegisterClicked()
    }

    const handleLoginLinkClick = event => {
        event.preventDefault()

        onLoginClicked()
    }

    return <main className="Main-landing">

        <h2>Welcome!</h2>

        <p className="Main-paragraph"><a href="" onClick={handleRegisterLinkClick}>Register</a> or <a href="" onClick={handleLoginLinkClick}>Login</a></p>

    </main>
}

export default Landing