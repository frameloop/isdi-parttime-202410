import { Session } from '../data/models.js'

const getCustomerSessions = async (customerId) => {
    const sessions = await Session.find({ customer: customerId })
        .populate({
            path: 'photographer',
            populate: {
                path: 'user', // 👈 Esto es clave para acceder al nombre
                select: 'name email phone'
            }
        })

    // 🔁 Mapea para incluir directamente los datos del user en photographer
    return sessions.map(session => {
        const photographer = session.photographer
        const user = photographer?.user

        return {
            ...session.toObject(),
            photographer: {
                ...photographer.toObject(),
                name: user?.name,
                email: user?.email,
                phone: user?.phone
            }
        }
    })
}

export default getCustomerSessions
