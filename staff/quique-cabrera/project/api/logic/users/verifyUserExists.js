import { User } from '../../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const verifyUserExists = async (username) => {
    try {
        validate.username(username)

        const user = await User.findOne({ username })

        if (!user) {
            throw new NotFoundError('Usuario no encontrado')
        }

        return {
            id: user._id, //CUATE!
            username: user.username,
            name: user.name,
            role: user.role
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}

export default verifyUserExists 