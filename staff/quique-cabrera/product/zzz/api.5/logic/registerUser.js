import validate from './helper/validate.js'
import { User } from '../data/models.js'
import errors from './errors/index.js'

const { DuplicityError, SystemError } = errors

const registerUser = (name, email, username, password) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)

    const user = new User({ name, email, username, password })

    return user.save()
        .catch(error => {
            if (error.code === 11000)
                throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        })
        .then(user => { })
}

export default registerUser