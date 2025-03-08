import { Customer, Photographer, Session } from '../../../data/models.js';

// Eliminar sesión
export const deleteSession = async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);
        if (!session) return res.status(404).json({ error: 'Session not found' });

        // Remover la sesión de clientes y fotógrafos
        await Customer.findByIdAndUpdate(session.customer, { $pull: { sessions: session._id } });
        await Photographer.findByIdAndUpdate(session.photographer, { $pull: { sessions: session._id } });

        res.json({ message: 'Session deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting session' });
    }
};
