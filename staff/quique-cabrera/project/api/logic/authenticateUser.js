import { User } from '../data/models.js'
import { validate, errors } from 'com'
const { SystemError, CredentialsError } = errors
import bcrypt from 'bcryptjs'

const authenticateUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({ username })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new CredentialsError('user: wrong credentials')

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new CredentialsError('bcrypt: wrong credentials')

                    return user._id.toString()
                })
        })
}

export default authenticateUser