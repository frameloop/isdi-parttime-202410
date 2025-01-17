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

    return <main className="Main">

        <h2>Welcome!</h2>

        <p><a href="" onClick={handleRegisterLinkClick}>Register</a> or <a href="" onClick={handleLoginLinkClick}>Login</a></p>

    </main>
}

export default Landing