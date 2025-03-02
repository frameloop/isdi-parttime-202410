import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { DuplicityError, SystemError } = errors

import bcrypt, { hash } from 'bcryptjs'

const registerUser = (name, email, username, password) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)

    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })
        .then(hash => {
            const user = new User({ name, email, username, password: hash })

            return user.save()
                .catch(error => {
                    if (error.code === 11000)
                        throw new DuplicityError('user already exists')

                    throw new SystemError(error.message)
                })
        })
        .then(user => { })
}

export default registerUser