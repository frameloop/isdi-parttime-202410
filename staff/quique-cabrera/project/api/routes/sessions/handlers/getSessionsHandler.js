import logic from '../../../logic/index.js'

export const getSessions = async (req, res) => {
    const result = await logic.getSessionsLogic();
    if (result.error) return res.status(result.status).json(result.error);
    res.json(result.data);
};