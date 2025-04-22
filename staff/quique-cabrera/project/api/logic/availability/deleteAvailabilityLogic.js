import { Availability } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'

const deleteAvailabilityLogic = async (availabilityId) => {
    try {
        validate.id(availabilityId)

        const availability = await Availability.findById(availabilityId)

        if (!availability) {
            throw new NotFoundError('Disponibilidad no encontrada')
        }

        await Availability.deleteOne({ _id: availabilityId })

        return { message: 'Disponibilidad eliminada correctamente' }
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}

export default deleteAvailabilityLogic 