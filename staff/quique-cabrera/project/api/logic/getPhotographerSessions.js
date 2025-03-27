import { Session } from '../data/models.js'

const getPhotographerSessions = async (photographerId) => {
    const sessions = await Session.find({ photographer: photographerId })
        .populate({
            path: 'customer',
            populate: {
                path: 'user', // 👈 Esto conecta con el nombre del cliente
                select: 'name email phone'
            }
        })

    // 🔁 Mapeamos los resultados para dejar los datos del cliente más accesibles
    return sessions.map(session => {
        const customer = session.customer
        const user = customer?.user

        return {
            ...session.toObject(),
            customer: {
                ...customer.toObject(),
                name: user?.name,
                email: user?.email,
                phone: user?.phone
            }
        }
    })
}

export default getPhotographerSessions
