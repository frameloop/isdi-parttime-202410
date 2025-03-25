import { Session, Customer, Photographer } from '../../../data/models.js'

export const getUserSessions = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized', message: 'User not found' })
        }

        const { _id: userId, role } = req.user
        let userRef, sessions

        if (role === 'customer') {
            userRef = await Customer.findOne({ user: userId })

            if (!userRef) {
                return res.status(404).json({ error: 'Not Found', message: 'Customer not found' })
            }

            sessions = await Session.find({ customer: userRef._id })
                .populate({
                    path: 'photographer',
                    populate: { path: 'user', select: 'name phone' }, // 👈 aquí está la magia
                })
                .sort({ date: 1 })

        } else if (role === 'photographer') {
            userRef = await Photographer.findOne({ user: userId })

            if (!userRef) {
                return res.status(404).json({ error: 'Not Found', message: 'Photographer not found' })
            }

            sessions = await Session.find({ photographer: userRef._id })
                .populate({
                    path: 'customer',
                    populate: { path: 'user', select: 'name phone' }, // 👈 también aquí
                })
                .sort({ date: 1 })

        } else {
            return res.status(403).json({ error: 'Forbidden', message: 'Unauthorized role' })
        }

        res.json(sessions)

    } catch (error) {
        console.error('Error en getUserSessions:', error)
        res.status(500).json({ error: 'Internal Server Error', message: 'Error fetching user sessions' })
    }
}
