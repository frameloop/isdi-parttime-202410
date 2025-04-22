import { User } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'

const getPhotographerLogic = async (photographerId) => {
    try {
        validate.id(photographerId)

        const photographer = await User.findById(photographerId)

        if (!photographer) {
            throw new NotFoundError('Fotógrafo no encontrado')
        }

        if (photographer.role !== 'photographer') {
            throw new NotFoundError('El usuario no es un fotógrafo')
        }

        return {
            id: photographer._id,
            name: photographer.name,
            email: photographer.email,
            role: photographer.role,
            profilePicture: photographer.profilePicture,
            bio: photographer.bio,
            portfolio: photographer.portfolio,
            rating: photographer.rating,
            reviews: photographer.reviews
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}

export default getPhotographerLogic 