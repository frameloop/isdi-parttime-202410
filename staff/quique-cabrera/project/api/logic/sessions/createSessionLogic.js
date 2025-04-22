import { User, Session, Photographer } from '../../data/models.js';
import { validateId } from '../../helpers/validateId.js';
import { SystemError } from '../../helpers/SystemError.js';
import { extractUserId } from '../../helpers/extractUserId.js';

/**
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @returns {Promise} - Promesa que resuelve con la sesión creada
 */
const createSessionLogic = async (req) => {
    console.log('Creating session with data:', req.body);
    const { photographerId, date, type, address, services } = req.body;

    // Validar campos requeridos
    if (!photographerId) throw new SystemError('El ID del fotógrafo es requerido');
    if (!date) throw new SystemError('La fecha es requerida');
    if (!type) throw new SystemError('El tipo de sesión es requerido');
    if (!address) throw new SystemError('La dirección es requerida');
    if (!services || !Array.isArray(services) || services.length === 0)
        throw new SystemError('Los servicios son requeridos');

    // Validar dirección
    if (!address.street || !address.postalCode || !address.city || !address.province)
        throw new SystemError('Todos los campos de la dirección son requeridos');

    // Validar formato del ID
    validateId(photographerId);

    // Obtener el ID del cliente del token
    const customerId = extractUserId(req);

    try {
        // Verificar que el fotógrafo existe
        const photographer = await Photographer.findById(photographerId)
            .populate('user', 'name');

        if (!photographer)
            throw new SystemError('El fotógrafo no existe');

        // Crear la sesión
        const session = await Session.create({
            photographer: photographerId,
            customer: customerId,
            date: new Date(date),
            type,
            address,
            services,
            status: 'scheduled'
        });

        // Poblar los datos del fotógrafo para la respuesta
        await session.populate('photographer');

        console.log('Session created successfully:', session);

        return session;
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
};

export default createSessionLogic; 