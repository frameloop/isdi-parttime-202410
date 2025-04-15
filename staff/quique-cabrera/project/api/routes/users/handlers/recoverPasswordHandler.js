import logic from '../../../logic/index.js'

export default async (req, res, next) => {
    const result = await logic.recoverPasswordLogic(req);
    if (result.error) return res.status(result.status).json(result.error);
    res.json(result.data);
};