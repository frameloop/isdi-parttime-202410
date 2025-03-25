import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const getUserName = async (userId) => {
    try {
        validate.id(userId, 'userId')

        const user = await User.findById(userId)

        if (!user) {
            throw new NotFoundError('User not found')
        }

        return user.name

    } catch (error) {
        // Solo propagamos errores conocidos, el resto los envolvemos
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}

export default getUserName
