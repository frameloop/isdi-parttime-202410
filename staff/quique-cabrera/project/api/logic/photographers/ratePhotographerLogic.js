import { User } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'

const ratePhotographerLogic = async (photographerId, rating, review) => {
    try {
        validate.id(photographerId)
        validate.number(rating, 'rating')
        validate.string(review, 'review')

        if (rating < 1 || rating > 5) {
            throw new SystemError('La valoración debe estar entre 1 y 5')
        }

        const photographer = await User.findById(photographerId)

        if (!photographer) {
            throw new NotFoundError('Fotógrafo no encontrado')
        }

        if (photographer.role !== 'photographer') {
            throw new NotFoundError('El usuario no es un fotógrafo')
        }

        photographer.reviews.push({
            rating,
            review,
            date: new Date()
        })

        const totalRatings = photographer.reviews.length
        const sumRatings = photographer.reviews.reduce((sum, review) => sum + review.rating, 0)
        photographer.rating = sumRatings / totalRatings

        await photographer.save()

        return {
            id: photographer._id,
            name: photographer.name,
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

export default ratePhotographerLogic 