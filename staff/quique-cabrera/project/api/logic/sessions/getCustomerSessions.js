import { Session } from '../../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const getCustomerSessions = async (customerId) => {
    try {
        validate.id(customerId)

        const sessions = await Session.find({ customer: customerId })
            .populate('photographer', 'name')
            .sort({ date: -1 })

        if (!sessions.length) {
            throw new NotFoundError('No se encontraron sesiones para este cliente')
        }

        return sessions.map(session => ({
            _id: session._id,
            date: session.date,
            duration: session.duration,
            status: session.status,
            photographer: {
                _id: session.photographer._id,
                name: session.photographer.name
            }
        }))
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}

export default getCustomerSessions 