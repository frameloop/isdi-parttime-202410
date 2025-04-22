import { Availability, Photographer } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'

/**
 * Retrieves all availability slots for a specific photographer.
 *
 * @param {string} photographerId The ID of the photographer whose availability to retrieve.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of availability objects.
 * @throws {TypeError} If photographerId is not a valid ID format.
 * @throws {NotFoundError} If no availability slots are found for the photographer.
 * @throws {SystemError} If an unexpected error occurs during database interaction.
 */
const getPhotographerAvailabilityLogic = async (photographerId) => {
    validate.id(photographerId, 'Photographer ID')

    try {
        // Primero obtener el fotógrafo para tener su información
        const photographer = await Photographer.findById(photographerId)
            .populate('user', 'name')
            .lean();

        if (!photographer) {
            throw new NotFoundError(`Photographer not found with ID ${photographerId}`);
        }

        // Find all availability slots for the photographer, sort by date and start time
        const availabilitySlots = await Availability.find({ photographer: photographerId })
            .sort({ date: 1, startDate: 1 })
            .lean();

        // Formatear la respuesta (convertir _id a id, etc.)
        const formattedSlots = availabilitySlots.map(slot => ({
            id: slot._id.toString(),
            photographerId: photographerId,
            photographer: {
                _id: photographerId,
                name: photographer.user?.name || 'Nombre no encontrado',
                coverage_area: photographer.coverage_area || 'Zona no especificada'
            },
            date: slot.date.toISOString().split('T')[0], // Formato YYYY-MM-DD
            startDate: slot.startDate.toISOString(), // Formato ISO completo
            endDate: slot.endDate.toISOString(),   // Formato ISO completo
            available: slot.available
        }));

        return formattedSlots;

    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new SystemError(error.message);
    }
}

export default getPhotographerAvailabilityLogic; 