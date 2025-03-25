import { Session } from '../../../data/models.js'

export const getSessions = async (req, res) => {
    try {
        // Obtenemos TODAS las sesiones del sistema
        // Y populamos el nombre y email del cliente y del fotógrafo
        const sessions = await Session.find()
            .populate('customer', 'name email')
            .populate('photographer', 'name email')

        // Enviamos el array de sesiones
        res.json(sessions)

    } catch (error) {
        console.error('Error en getSessions:', error)
        res.status(500).json({ error: 'Error fetching sessions' })
    }
}
