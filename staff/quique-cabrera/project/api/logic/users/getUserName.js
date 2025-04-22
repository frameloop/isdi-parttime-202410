import { User } from '../../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const getUserName = async (userId) => {
    try {
        validate.id(userId)

        const user = await User.findById(userId).select('name')

        if (!user) {
            throw new NotFoundError('Usuario no encontrado')
        }

        return user.name
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}

export default getUserName 