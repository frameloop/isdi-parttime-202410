import { Session } from '../../../data/models.js';

export const deleteSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const deleted = await Session.findByIdAndDelete(sessionId);
        if (!deleted) return res.status(404).json({ error: 'NotFound', message: 'Sesión no encontrada' });

        res.json({ success: true });
    } catch (error) {
        console.error('[deleteSession] Error:', error);
        res.status(500).json({ error: 'Error al eliminar sesión', details: error.message });
    }
};
