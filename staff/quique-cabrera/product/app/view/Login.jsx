import logic from '../logic'
import { errors } from 'com'

const { CredentialsError, SystemError } = errors

import { useAppContext } from '../context'

function Login({ onUserLoggedIn, onRegisterClicked }) {
    console.log('Login -> render')

    const { alert } = useAppContext()

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
                    if (error instanceof CredentialsError)
                        alert(error.message)
                    else if (error instanceof SystemError)
                        alert('Sorry, try again later.')
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

    return <main className="p-[2%]">
        <h2 className="text-[2rem] text-[--color-greydark] text-center mt-8">Login</h2>

        <form onSubmit={handleFormSubmit}>
            <label htmlFor="username">Username</label>
            <input className="rounded-lg" type="text" id="username" />

            <label htmlFor="password">Password</label>
            <input className="rounded-lg" type="password" id="password" />

            <button type="submit" className="button">Login</button>
        </form>

        <a href="" onClick={handleRegisterLinkClick}>{"<< Register"}</a>
    </main>
}

export default Login