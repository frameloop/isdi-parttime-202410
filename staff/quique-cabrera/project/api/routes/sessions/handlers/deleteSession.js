import { Session, Photographer, Customer } from '../../../data/models.js'
import mongoose from 'mongoose'

export const deleteSession = async (req, res) => {
    try {
        const sessionId = req.params.sessionId
        const userId = req.user._id
        const role = req.user.role

        if (!mongoose.Types.ObjectId.isValid(sessionId)) {
            return res.status(400).json({ error: 'ID de sesión no válido.' })
        }

        const session = await Session.findById(sessionId)
        if (!session) {
            return res.status(404).json({ error: 'Sesión no encontrada.' })
        }

        // Validación de permisos según el rol
        if (role === 'customer') {
            const customer = await Customer.findOne({ user: userId })
            if (!customer || session.customer.toString() !== customer._id.toString()) {
                return res.status(403).json({ error: 'No tienes permiso para eliminar esta sesión.' })
            }
        } else if (role === 'photographer') {
            const photographer = await Photographer.findOne({ user: userId })
            if (!photographer || session.photographer.toString() !== photographer._id.toString()) {
                return res.status(403).json({ error: 'No tienes permiso para eliminar esta sesión.' })
            }
        }

        // ⚙ Eliminar la sesión
        await Session.findByIdAndDelete(sessionId)

        // ⛓ Opcional: eliminar referencias desde Customer y Photographer
        await Promise.all([
            Customer.updateOne({ sessions: sessionId }, { $pull: { sessions: sessionId } }),
            Photographer.updateOne({ sessions: sessionId }, { $pull: { sessions: sessionId } }),
        ])

        res.status(200).json({ message: 'Sesión eliminada correctamente.' })

    } catch (error) {
        console.error('Error al eliminar sesión:', error)
        res.status(500).json({ error: 'Error interno del servidor.' })
    }
}
