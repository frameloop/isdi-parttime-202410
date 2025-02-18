import logic from '../logic'

function Login({ onUserLoggedIn, onRegisterClicked }) {
    console.log('Login --> render')

    const handleFormSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)
                .then(() => {
                    form.reset()

                    onUserLoggedIn()
                })
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleRegisterLinkClick = event => {
        event.preventDefault()

        onRegisterClicked()
    }

    return <main class="p-[2%]">
        <h2 class="text-[2rem] text-[--color-greydark] text-center mt-8">Login</h2>

        <form onSubmit={handleFormSubmit}>
            <label htmlFor="username">Username</label>
            <input class="rounded-lg" type="text" id="username" />

            <label htmlFor="password">Password</label>
            <input class="rounded-lg" type="password" id="password" />

            <button type="submit" className="button">Login</button>
        </form>

        <a href="" onClick={handleRegisterLinkClick}>{"<< Register"}</a>
    </main>
}

export default Login