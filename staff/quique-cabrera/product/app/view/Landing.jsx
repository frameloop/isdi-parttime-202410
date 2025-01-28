import './Landing.css'

function Landing(props) {
    console.log('Landing --> render')

    const handleRegisterLinkClick = event => {
        event.preventDefault()

        props.onRegisterClicked()
    }

    const handleLoginLinkClick = event => {
        event.preventDefault()

        props.onLoginClicked()
    }

    return <main className="Main-landing">

        <h2>Welcome!</h2>

        <p className="Main-paragraph"><a href="" onClick={handleRegisterLinkClick}>Register</a> or <a href="" onClick={handleLoginLinkClick}>Login</a></p>

    </main>
}

export default Landing