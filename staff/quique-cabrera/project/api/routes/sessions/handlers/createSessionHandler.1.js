import logic from '../../../logic/index.js'

export const createSession = async (req, res, next) => {
    try {
        const session = await logic.createSessionLogic(req);
        res.status(201).json(session);
    } catch (error) {
        next(error);
    }
};