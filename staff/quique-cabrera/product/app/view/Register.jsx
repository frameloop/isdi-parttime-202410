import logic from '../logic'
import { errors } from 'com'

const { DuplicityError, SystemError } = errors

import { useAppContext } from '../context'

function Register({ onUserRegistered, onLoginClicked }) {
    console.log('Register --> Render')

    const { alert } = useAppContext()

    const handleFormSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value

        try {
            logic.registerUser(name, email, username, password)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => {
                    if (error instanceof DuplicityError)
                        alert(error.message)
                    else if (error instanceof SystemError)
                        alert('Sorry, try again later.')

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }
    const handleLoginLinkClick = event => {
        event.preventDefault()

        onLoginClicked()
    }

    return <main className="p-[2%]">
        <h2 className="text-[2rem] text-[--color-greydark] text-center mt-8">Register</h2>

        <form onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name</label>
            <input className="rounded-lg" type="text" id="name" />

            <label htmlFor="email">E-mail</label>
            <input className="rounded-lg" type="email" id="email" />

            <label htmlFor="username">Username</label>
            <input className="rounded-lg" type="text" id="username" />

            <label htmlFor="password">Password</label>
            <input className="rounded-lg" type="password" id="password" />

            <button type="submit" className="button">Register</button>
        </form>

        <a href="" onClick={handleLoginLinkClick}>{"<< Login"}</a>
    </main>
}

export default Register