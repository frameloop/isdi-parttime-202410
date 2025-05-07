import logic from '../../../logic/index.js'

export const createSession = async (req, res) => {
    try {
        const session = await logic.createSessionLogic(req);
        if (session.error) return res.status(session.status).json(session.error);
        res.status(201).json(session.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};