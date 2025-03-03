import { User } from '../data/models.js'
import { validate, errors } from 'com'
const { SystemError, CredentialsError } = errors
import bcrypt from 'bcryptjs'

const authenticateUser = (username, password) => {
    try {
        validate.username(username)
        validate.password(password)

        return User.findOne({ username })
            .then(user => {
                if (!user) throw new CredentialsError('wrong credentials')

                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw new CredentialsError('wrong credentials')

                        return user._id.toString();
                    })
            })
            .catch(error => {
                throw new SystemError(error.message)
            })

    } catch (error) {
        return Promise.reject(error)
    }
};

export default authenticateUser;
