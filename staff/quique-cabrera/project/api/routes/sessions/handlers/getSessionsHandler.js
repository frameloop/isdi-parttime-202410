import { Session } from '../../../data/models.js';

export const getSessions = async (req, res) => {
    try {
        const sessions = await Session.find()
            .populate('customer', 'name email')
            .populate('photographer', 'name email');
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sessions' });
    }
};