import { Availability } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'
import mongoose from 'mongoose'

const updateAvailabilityLogic = async (availabilityId, updates) => {
    validate.id(availabilityId)
    // Basic validation for updates (can be enhanced)
    if (typeof updates !== 'object' || updates === null) {
        throw new SystemError('Invalid updates format');
    }

    // Add validation for specific fields in updates if necessary
    // Ex: if (updates.date) validate.date(updates.date)

    try {
        const availability = await Availability.findById(availabilityId)

        if (!availability) {
            throw new NotFoundError('Availability slot not found')
        }

        // Apply updates
        Object.assign(availability, updates)

        await availability.save()

        // Formatear respuesta
        const populatedAvailability = await Availability.findById(availability._id).populate('photographer', 'name').lean()
        return {
            ...populatedAvailability,
            id: populatedAvailability._id.toString(),
            photographerId: populatedAvailability.photographer?._id.toString(),
            photographerName: populatedAvailability.photographer?.name
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}

export default updateAvailabilityLogic 