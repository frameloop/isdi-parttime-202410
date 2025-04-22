import { User, Session } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'

const getPhotographerSessionsLogic = async (photographerUserId) => {
    validate.id(photographerUserId, 'photographer user ID')

    try {
        // Encontrar el perfil de fotógrafo asociado al ID de usuario
        // Asumiendo que hay una referencia 'user' en el modelo Photographer
        const photographer = await User.findOne({ _id: photographerUserId, role: 'photographer' }).lean() // Simplificado

        if (!photographer) {
            throw new NotFoundError('Photographer not found or user is not a photographer')
        }

        // Encontrar sesiones donde el photographerId coincida
        const sessions = await Session.find({ photographer: photographer._id })
            .populate('customer', 'name email') // Popular cliente
            .sort({ date: 1 })
            .lean()

        // Formatear la respuesta
        return sessions.map(session => ({
            ...session,
            id: session._id.toString(),
            photographerId: photographer._id.toString(),
            photographerName: photographer.name,
            customerId: session.customer?._id.toString(),
            customerName: session.customer?.name,
            // Asegúrate que los campos internos como _id y __v no se expongan si no es necesario
            // Puedes eliminar photographer y customer originales si ya extrajiste la info necesaria
        }))

    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}

export default getPhotographerSessionsLogic 