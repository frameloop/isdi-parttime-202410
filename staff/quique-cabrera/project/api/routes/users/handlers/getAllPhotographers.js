import logic from '../../../logic/index.js'

export const getAllPhotographers = async (req, res) => {
    try {
        const result = await logic.getPhotographersLogic();

        if (result.error) {
            return res.status(result.status || 500).json({ error: result.error });
        }

        // Asegurarse de que result.data es un array
        const rawPhotographers = Array.isArray(result.data) ? result.data : [];

        // Mapear para transformar _id a id
        const photographers = rawPhotographers.map(photographer => {
            return photographer; // Devolver el objeto tal cual viene de la lógica
        });

        res.json(photographers);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getUserSessions = async (req, res, next) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized', message: 'User ID not available from token' });
        }

        const sessions = await logic.getUserSessionsLogic(userId);

        res.json(sessions);

    } catch (error) {
        next(error);
    }
};

export const updateAvailability = async (req, res, next) => {
    try {
        const result = await logic.updateAvailabilityLogic(req);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const getPhotographerSessions = async (req, res) => {
    const result = await logic.getPhotographerSessionsLogic(req);
    if (result.error) return res.status(result.status).json(result.error);
    res.json(result.data);
};