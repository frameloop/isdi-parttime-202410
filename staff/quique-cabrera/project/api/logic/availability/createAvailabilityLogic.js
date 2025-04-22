import { Availability, Photographer } from '../../data/models.js'
import { validate, SystemError, NotFoundError, DuplicityError } from 'com'
import executeLogic from '../../helpers/executeLogic.js'

const createAvailabilityLogic = async ({ body, userId }) => {
    console.log('[Logic - createAvailability] Starting with body:', body);
    console.log('[Logic - createAvailability] User ID:', userId);

    const { photographerId, date, startDate, endDate } = body

    // Validaciones iniciales
    const missingFields = [];
    if (!photographerId) missingFields.push('Photographer ID');
    if (!date) missingFields.push('date');
    if (!startDate) missingFields.push('start date');
    if (!endDate) missingFields.push('end date');

    if (missingFields.length > 0) {
        const error = new SystemError(`Missing required fields: ${missingFields.join(', ')}`);
        console.error('[Logic - createAvailability] Validation error:', error);
        throw error;
    }

    try {
        validate.id(photographerId, 'photographer ID');
        // Intentar parsear las fechas para validarlas
        const dateObj = new Date(date);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (isNaN(dateObj.getTime()) || isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
            throw new SystemError('Invalid date format. Please use ISO 8601 format.');
        }

        if (startDateObj >= endDateObj) {
            throw new SystemError('Start date must be before end date.');
        }

        console.log('[Logic - createAvailability] Searching for photographer with userId:', userId);
        // Primero, encontrar el documento Photographer asociado al usuario actual
        const photographer = await Photographer.findOne({ user: userId });

        if (!photographer) {
            const error = new NotFoundError('Photographer not found for current user');
            console.error('[Logic - createAvailability] Photographer not found:', error);
            throw error;
        }

        console.log('[Logic - createAvailability] Found photographer:', photographer._id.toString());

        // Verificar que el photographerId proporcionado coincide con el del usuario actual
        if (photographer._id.toString() !== photographerId) {
            const error = new SystemError('Unauthorized: Cannot create availability for another photographer');
            console.error('[Logic - createAvailability] Authorization error:', error);
            throw error;
        }

        console.log('[Logic - createAvailability] Creating availability entry...');
        // Crear la disponibilidad usando el ID del documento Photographer
        const availability = await Availability.create({
            photographer: photographer._id,
            date: dateObj,
            startDate: startDateObj,
            endDate: endDateObj,
            available: true
        });

        const result = {
            _id: availability._id.toString(),
            photographer: photographer._id.toString(),
            date: availability.date.toISOString(),
            startDate: availability.startDate.toISOString(),
            endDate: availability.endDate.toISOString(),
            available: availability.available
        };

        console.log('[Logic - createAvailability] Success:', result);
        return result;

    } catch (error) {
        console.error('[Logic - createAvailability] Error:', error);
        if (error instanceof NotFoundError || error instanceof SystemError || error instanceof DuplicityError) {
            throw error;
        }
        // Handle potential duplicate key errors from MongoDB index
        if (error.code === 11000) {
            throw new DuplicityError('Availability slot conflicts with an existing one.');
        }
        // Generic error
        throw new SystemError(error.message);
    }
};

export default createAvailabilityLogic; 