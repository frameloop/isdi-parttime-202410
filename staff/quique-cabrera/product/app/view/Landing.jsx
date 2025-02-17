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

    return <main class="flex justify-center items-center gap-[10px] h-full p-[2%]">

        <h2>Welcome!</h2>

        <p class="mt-[25px]"><a href="" onClick={handleRegisterLinkClick}>Register</a> or <a href="" onClick={handleLoginLinkClick}>Login</a></p>

    </main>
}

export default Landing