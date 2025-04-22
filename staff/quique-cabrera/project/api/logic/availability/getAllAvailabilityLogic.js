import { Availability } from '../../data/models.js'
import { validate, SystemError } from 'com'

const getAllAvailabilityLogic = async (photographerId) => {
    // Optional: Validate photographerId if needed
    // validate.id(photographerId, 'photographer ID') 

    try {
        const query = photographerId ? { photographer: photographerId } : {}
        const availabilities = await Availability.find(query).populate('photographer', 'name').lean()

        // Formatear respuesta si es necesario
        return availabilities.map(av => ({
            ...av,
            id: av._id.toString(),
            photographerId: av.photographer?._id.toString(),
            photographerName: av.photographer?.name
            // Remover campos internos si es necesario
        }))
    } catch (error) {
        throw new SystemError(error.message) // Re-lanzar como SystemError
    }
}

export default getAllAvailabilityLogic 