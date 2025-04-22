import { User } from '../../data/models.js'
import bcrypt from 'bcryptjs'
import { validate, errors } from 'com'

const { SystemError, DuplicityError } = errors

const registerUser = async (username, password, name, email) => {
    try {
        validate.username(username)
        validate.password(password)
        validate.name(name)
        validate.email(email)

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            password: hashedPassword,
            name,
            email,
            role: 'customer'
        })

        return {
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role
        }
    } catch (error) {
        if (error.code === 11000) {
            throw new DuplicityError('El usuario ya existe')
        }

        throw new SystemError(error.message)
    }
}

export default registerUser 