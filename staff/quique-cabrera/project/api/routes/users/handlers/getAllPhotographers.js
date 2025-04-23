import logic from '../../../logic/index.js'

export const getAllPhotographers = async (req, res) => {
    try {
        console.log('[getAllPhotographers] Iniciando obtención de fotógrafos');
        const result = await logic.getPhotographersLogic();
        console.log('[getAllPhotographers] Resultado:', result);

        if (result.error) {
            console.error('[getAllPhotographers] Error:', result.error);
            return res.status(result.status || 500).json({ error: result.error });
        }

        // Asegurarse de que result.data es un array
        const rawPhotographers = Array.isArray(result.data) ? result.data : [];

        // Mapear para transformar _id a id
        const photographers = rawPhotographers.map(photographer => {
            // Asumiendo que 'photographer' ahora tiene 'id' y el resto de campos directamente
            // y que 'id' ya es un string o un tipo que se pueda serializar a JSON.
            // Si necesitamos asegurar que 'id' sea un string, podemos hacer:
            // const { id, ...rest } = photographer;
            // return { id: String(id), ...rest };
            // Por ahora, simplemente retornamos el objeto como viene de la lógica,
            // asumiendo que ya tiene la forma deseada { id: ..., ...rest }
            return photographer; // Devolver el objeto tal cual viene de la lógica
        });

        console.log('[getAllPhotographers] Enviando fotógrafos transformados:', photographers);
        res.json(photographers);
    } catch (error) {
        console.error('[getAllPhotographers] Error no manejado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

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