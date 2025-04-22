import { Session } from '../../data/models.js'
import { validate, SystemError } from 'com'

const getSessionsLogic = async (req) => {
    try {
        // Obtener el ID del fotógrafo del token
        const { photographerId } = req;

        if (!photographerId) {
            throw new SystemError('No se encontró el ID del fotógrafo');
        }

        const sessions = await Session.find({ photographer: photographerId })
            .populate({
                path: 'customer',
                populate: {
                    path: 'user',
                    select: 'name phone email'
                }
            })
            .populate('photographer', 'name email')
            .sort({ date: 1 })
            .lean()

        // Formatear respuesta
        return sessions.map(session => ({
            ...session,
            id: session._id.toString(),
            customerId: session.customer?._id.toString(),
            customerName: session.customer?.user?.name,
            customerPhone: session.customer?.user?.phone,
            photographerId: session.photographer?._id.toString(),
            photographerName: session.photographer?.name,
            // Omitir customer y photographer originales si ya se extrajo la info
        }))
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default getSessionsLogic 