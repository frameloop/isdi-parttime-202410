import { Photographer } from '../../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const findPhotographerProfile = async (userId) => {
    try {
        validate.id(userId)

        const photographer = await Photographer.findOne({ user: userId })

        if (!photographer) {
            throw new NotFoundError('Perfil de fotógrafo no encontrado')
        }

        return photographer
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}

export default findPhotographerProfile 