function Landing(props) {
    console.log('Landing --> render')

    const handleLoginLinkClick = event => {
        event.preventDefault()

        props.onRegisterClicked()
    }

    return <main>

        <h2>Welcome!</h2>

        <p><a href="" onClick={handleLoginLinkClick}>Register</a> or <a href="" onClick={handleLoginLinkClick}>Login</a></p>

    </main>
}
