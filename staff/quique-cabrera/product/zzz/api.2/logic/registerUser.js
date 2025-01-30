import validate from './helper/validate.js'
import { User } from '../data/models.js'

const registerUser = (name, email, username, password) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)

    const user = new User({ name, email, username, password })

    return user.save()
        .then(user => { })
}

export default registerUser