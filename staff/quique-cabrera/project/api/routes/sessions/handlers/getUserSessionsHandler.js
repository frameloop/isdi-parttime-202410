import logic from '../../../logic/index.js'

export const getUserSessions = async (req, res, next) => {
    try {
        const userId = req.userId;

        if (!userId) {
            console.error("[Handler Error - getUserSessions] User ID not found in request.");
            return res.status(401).json({ error: 'Unauthorized', message: 'User ID not available from token' });
        }

        const sessions = await logic.getUserSessionsLogic(userId);

        res.json(sessions);

    } catch (error) {
        console.error("[Handler Error - getUserSessions]:", error);
        next(error);
    }
};

export const updateAvailability = async (req, res, next) => {
    try {
        const result = await logic.updateAvailabilityLogic(req);
        res.json(result);
    } catch (error) {
        console.error("[Controller Error - updateAvailability]:", error);
        next(error);
    }
};

export const getPhotographerSessions = async (req, res) => {
    const result = await logic.getPhotographerSessionsLogic(req);
    if (result.error) return res.status(result.status).json(result.error);
    res.json(result.data);
};

export const createSession = async (req, res, next) => {
    try {
        const session = await logic.createSessionLogic(req);
        res.status(201).json(session);
    } catch (error) {
        next(error);
    }
};