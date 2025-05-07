import logic from '../../../logic/index.js'

export const getPhotographerSessions = async (req, res) => {
    try {
        const result = await logic.getPhotographerSessionsLogic(req);
        if (result.error) return res.status(result.status).json(result.error);
        res.json(result.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};