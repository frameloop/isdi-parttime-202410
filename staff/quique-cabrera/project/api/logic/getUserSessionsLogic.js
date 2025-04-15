import { Session, Customer, Photographer } from '../data/models.js'

const getUserSessionsLogic = async (req) => {
    try {
        if (!req.user) {
            return { error: { error: 'Unauthorized', message: 'User not found' }, status: 401 };
        }

        const { _id: userId, role } = req.user;
        let userRef, sessions;

        if (role === 'customer') {
            userRef = await Customer.findOne({ user: userId });

            if (!userRef) {
                return { error: { error: 'Not Found', message: 'Customer not found' }, status: 404 };
            }

            sessions = await Session.find({ customer: userRef._id })
                .populate({
                    path: 'photographer',
                    populate: { path: 'user', select: 'name phone' }
                })
                .sort({ date: 1 });

        } else if (role === 'photographer') {
            userRef = await Photographer.findOne({ user: userId });

            if (!userRef) {
                return { error: { error: 'Not Found', message: 'Photographer not found' }, status: 404 };
            }

            sessions = await Session.find({ photographer: userRef._id })
                .populate({
                    path: 'customer',
                    populate: { path: 'user', select: 'name phone' }
                })
                .sort({ date: 1 });

        } else {
            return { error: { error: 'Forbidden', message: 'Unauthorized role' }, status: 403 };
        }

        return { data: sessions };
    } catch (error) {
        console.error('Error en getUserSessions:', error);
        return { error: { error: 'Internal Server Error', message: 'Error fetching user sessions' }, status: 500 };
    }
};

export default getUserSessionsLogic;