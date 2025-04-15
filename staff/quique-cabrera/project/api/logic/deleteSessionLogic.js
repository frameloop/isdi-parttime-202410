import { Session, Photographer, Customer } from '../data/models.js'
import mongoose from 'mongoose'

const deleteSessionLogic = async (req) => {
    try {
        const sessionId = req.params.sessionId;
        const userId = req.user._id;
        const role = req.user.role;

        if (!mongoose.Types.ObjectId.isValid(sessionId)) {
            return { error: { error: 'ID de sesión no válido.' }, status: 400 };
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return { error: { error: 'Sesión no encontrada.' }, status: 404 };
        }

        if (role === 'customer') {
            const customer = await Customer.findOne({ user: userId });
            if (!customer || session.customer.toString() !== customer._id.toString()) {
                return { error: { error: 'No tienes permiso para eliminar esta sesión.' }, status: 403 };
            }
        } else if (role === 'photographer') {
            const photographer = await Photographer.findOne({ user: userId });
            if (!photographer || session.photographer.toString() !== photographer._id.toString()) {
                return { error: { error: 'No tienes permiso para eliminar esta sesión.' }, status: 403 };
            }
        }

        await Session.findByIdAndDelete(sessionId);

        await Promise.all([
            Customer.updateOne({ sessions: sessionId }, { $pull: { sessions: sessionId } }),
            Photographer.updateOne({ sessions: sessionId }, { $pull: { sessions: sessionId } }),
        ]);

        return { data: { message: 'Sesión eliminada correctamente.' } };
    } catch (error) {
        console.error('Error al eliminar sesión:', error);
        return { error: { error: 'Error interno del servidor.' }, status: 500 };
    }
};

export default deleteSessionLogic;