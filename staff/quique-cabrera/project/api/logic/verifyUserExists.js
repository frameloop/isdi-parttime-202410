import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, CredentialsError } = errors

const verifyUserExists = async (username) => {
    try {
        // Validamos el formato del nombre de usuario
        validate.username(username)

        const user = await User.findOne({ username })

        if (!user) {
            throw new CredentialsError('User not found')
        }

        // Devuelve solo lo necesario
        return {
            success: true,
            name: user.name,
            email: user.email
        }

    } catch (error) {
        // Mantenemos errores esperados, encapsulamos solo lo inesperado
        if (error instanceof CredentialsError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}

export default verifyUserExists
