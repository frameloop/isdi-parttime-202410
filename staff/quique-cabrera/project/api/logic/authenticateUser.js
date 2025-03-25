import { User } from '../data/models.js'
import { validate, errors } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, CredentialsError } = errors

const authenticateUser = async (username, password) => {
    try {
        validate.username(username)
        validate.password(password)

        // Buscamos al usuario e incluimos su password y rol
        const user = await User.findOne({ username }).select('+password role name email')

        if (!user) {
            throw new CredentialsError('Credenciales incorrectas')
        }

        if (!user.password) {
            throw new SystemError('Invalid user data: password is missing')
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw new CredentialsError('Credenciales incorrectas')
        }

        // Devolvemos todos los datos necesarios para el token y la respuesta
        return {
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role
        }

    } catch (error) {
        // Solo errores inesperados se transforman en SystemError
        if (
            error instanceof CredentialsError ||
            error instanceof SystemError
        ) {
            throw error
        }

        throw new SystemError(error.message)
    }
}

export default authenticateUser
