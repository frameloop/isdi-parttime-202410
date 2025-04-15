import logic from '../../../logic/index.js'

export const createSession = async (req, res) => {
    const result = await logic.createSessionLogic(req);
    if (result.error) return res.status(result.status).json(result.error);
    res.status(201).json(result.data);
};