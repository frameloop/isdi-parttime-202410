import { Photographer, Session } from '../../../data/models.js'

export const getPhotographerSessions = async (req, res) => {
    try {
        const photographerUserId = req.userId // lo extraemos desde el token (middleware)

        // Buscamos el fotógrafo asociado a este usuario
        const photographer = await Photographer.findOne({ user: photographerUserId }).populate('user', 'name email')

        if (!photographer) {
            return res.status(404).json({ error: 'Not Found', message: 'Photographer not found' })
        }

        // Obtenemos todas las sesiones asociadas al fotógrafo
        const sessions = await Session.find({ photographer: photographer._id })
            .populate('customer', 'name email phone')

        // Respondemos con los datos esenciales
        res.json({
            photographer: {
                _id: photographer._id,
                name: photographer.user.name,
                email: photographer.user.email
            },
            sessions
        })

    } catch (error) {
        console.error('Error en getPhotographerSessions:', error)
        res.status(500).json({ error: 'Internal Server Error', message: 'Error fetching photographer sessions' })
    }
}
