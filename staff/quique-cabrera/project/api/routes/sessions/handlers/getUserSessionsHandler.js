import logic from '../../../logic/index.js'

export const getUserSessions = async (req, res) => {
    const result = await logic.getUserSessionsLogic(req);
    if (result.error) return res.status(result.status).json(result.error);
    res.json(result.data);
};