import { Availability } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'

const getAvailabilityLogic = async (availabilityId) => {
    validate.id(availabilityId)

    try {
        const availability = await Availability.findById(availabilityId).populate('photographer', 'name').lean()

        if (!availability) {
            throw new NotFoundError('Availability slot not found')
        }

        // Formatear respuesta
        return {
            ...availability,
            id: availability._id.toString(),
            photographerId: availability.photographer?._id.toString(),
            photographerName: availability.photographer?.name
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}

export default getAvailabilityLogic 