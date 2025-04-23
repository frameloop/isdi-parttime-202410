import { Session, User, Photographer } from '../../data/models.js'
import { validate, SystemError, NotFoundError /*, UnauthorizedError */ } from 'com'

const getUserSessionsLogic = async (userId) => {
    validate.id(userId, 'user ID')

    try {
        const user = await User.findById(userId).lean()
        if (!user) {
            throw new NotFoundError('User not found')
        }

        let sessionsQuery;

        if (user.role === 'customer') {
            sessionsQuery = Session.find({ customer: user._id })
                .populate({
                    path: 'photographer',
                    populate: {
                        path: 'user',
                        select: 'name phone email'
                    }
                });
        } else if (user.role === 'photographer') {
            // Primero obtener el photographerId
            const photographer = await Photographer.findOne({ user: user._id });
            if (!photographer) {
                throw new NotFoundError('Photographer profile not found');
            }

            sessionsQuery = Session.find({ photographer: photographer._id })
                .populate({
                    path: 'customer',
                    populate: {
                        path: 'user',
                        select: 'name phone email'
                    }
                });
        } else {
            // Comentado temporalmente hasta que se decida qué hacer con UnauthorizedError
            // throw new UnauthorizedError('User role cannot view sessions')
            throw new SystemError('User role cannot view sessions'); // Lanzar SystemError temporalmente
        }

        const sessions = await sessionsQuery.sort({ date: 1 }).lean()

        console.log('Sessions retrieved:', sessions);

        return sessions.map(session => {
            const formattedSession = {
                ...session,
                id: session._id.toString(),
                photographer: session.photographer ? {
                    id: session.photographer._id.toString(),
                    user: session.photographer.user ? {
                        id: session.photographer.user._id.toString(),
                        name: session.photographer.user.name,
                        phone: session.photographer.user.phone,
                        email: session.photographer.user.email
                    } : null
                } : null,
                customer: session.customer ? {
                    id: session.customer._id.toString(),
                    user: session.customer.user ? {
                        id: session.customer.user._id.toString(),
                        name: session.customer.user.name,
                        phone: session.customer.user.phone,
                        email: session.customer.user.email
                    } : null
                } : null
            };

            console.log('Formatted session:', formattedSession);
            return formattedSession;
        });

    } catch (error) {
        // Comentado temporalmente
        // if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
        //     throw error
        // }
        if (error instanceof NotFoundError) { // Manejar NotFoundError
            throw error
        }
        console.error('Error in getUserSessionsLogic:', error);
        throw new SystemError(error.message)
    }
}

export default getUserSessionsLogic 