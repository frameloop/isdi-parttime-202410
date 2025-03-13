import logic from '../../../logic/index.js';
import jwt from 'jsonwebtoken';

export const getPhotographerSessions = (req, res, next) => { // ✅ Se exporta correctamente
    try {
        console.log('🟢 [getPhotographerSessions] Request received');

        if (!req.headers.authorization) {
            console.warn('⚠️ [getPhotographerSessions] No token provided');
            return res.status(401).json({ error: "AuthorizationError", message: "Missing token" });
        }

        const token = req.headers.authorization.split(' ')[1]; // Extraer token
        console.log(`🔑 [getPhotographerSessions] Token received: ${token}`);

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { sub: userId } = payload;
        console.log(`👤 [getPhotographerSessions] Extracted user ID: ${userId}`);

        logic.getPhotographerSessions(userId)
            .then(sessions => {
                if (!sessions || sessions.length === 0) {
                    console.warn(`⚠️ [getPhotographerSessions] No sessions found for photographer ID: ${userId}`);
                } else {
                    console.log(`✅ [getPhotographerSessions] Found ${sessions.length} sessions`);
                }
                res.json(sessions);
            })
            .catch(error => {
                console.error('❌ [getPhotographerSessions] Error fetching photographer sessions:', error);
                next(error);
            });

    } catch (error) {
        console.error('❌ [getPhotographerSessions] Unexpected error:', error);
        next(error);
    }
};
