import { User, Photographer } from '../../data/models.js'
import bcrypt from 'bcryptjs'
import { validate, errors } from 'com'

const { SystemError, CredentialsError } = errors

const authenticateUser = async (username, password) => {
    try {
        validate.username(username)
        validate.password(password)

        // Buscamos al usuario e incluimos su password y rol
        const user = await User.findOne({ username }).select('+password +role +name +email +username')

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

        // Si es un fotógrafo, obtener su ID
        let photographerId = null
        if (user.role === 'photographer') {
            const photographer = await Photographer.findOne({ user: user._id })
            if (photographer) {
                photographerId = photographer._id
            }
        }

        // Devolvemos todos los datos necesarios para el token y la respuesta
        return {
            id: user._id, //CUATE
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            photographerId
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