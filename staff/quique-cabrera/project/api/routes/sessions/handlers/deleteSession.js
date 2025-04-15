import logic from '../../../logic/index.js'

export const deleteSession = async (req, res) => {
    const result = await logic.deleteSessionLogic(req);
    if (result.error) return res.status(result.status).json(result.error);
    res.status(200).json(result.data);
};