import { Session } from '../../../data/models.js';

export const updateSession = async (req, res) => {
    try {
        const { status } = req.body;
        const session = await Session.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!session) return res.status(404).json({ error: 'Session not found' });

        res.json(session);
    } catch (error) {
        res.status(500).json({ error: 'Error updating session' });
    }
};