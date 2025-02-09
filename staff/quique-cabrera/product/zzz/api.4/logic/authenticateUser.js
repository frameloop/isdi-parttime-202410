import validate from './helper/validate.js'
import { User } from '../data/models.js'
import errors from './errors/index.js'

const { SystemError, CredentialsError } = errors

const authenticateUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({ username, password })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new CredentialsError('wrong credentials')

            return user._id.toString()
        })
}

export default authenticateUser