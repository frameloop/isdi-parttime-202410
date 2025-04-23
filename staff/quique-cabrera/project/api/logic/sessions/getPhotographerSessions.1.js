import { Session } from '../../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const getPhotographerSessions = async (photographerId) => {
    try {
        validate.id(photographerId)

        const sessions = await Session.find({ photographer: photographerId })
            .populate('customer', 'name')
            .sort({ date: -1 })

        if (!sessions.length) {
            throw new NotFoundError('No se encontraron sesiones para este fotógrafo')
        }

        return sessions.map(session => ({
            _id: session._id,
            date: session.date,
            duration: session.duration,
            status: session.status,
            customer: {
                _id: session.customer._id,
                name: session.customer.name
            }
        }))
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}

export default getPhotographerSessions 