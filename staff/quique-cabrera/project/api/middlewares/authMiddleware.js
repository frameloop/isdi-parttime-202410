import jwt from 'jsonwebtoken';
import { User, Photographer } from '../data/models.js';

export default async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.warn('[authMiddleware] Token no presente o mal formado');
            return res.status(401).json({ error: 'Unauthorized', message: 'Missing or malformed token' });
        }

        const token = authHeader.split(' ')[1];

        // Verificar token (ignorar expiración según lo acordado)
        const payload = jwt.verify(token, process.env.JWT_SECRET, {
            clockTolerance: 60,
            ignoreExpiration: true // Ignorar la caducidad del token
        });

        // Puedes quitar estos logs si ya no son necesarios
        const currentTimeEpoch = Math.floor(Date.now() / 1000);
        console.log('[AuthMiddleware] Current Server Time (Epoch):', currentTimeEpoch);
        console.log('[AuthMiddleware] Current Server Time (ISO):', new Date(currentTimeEpoch * 1000).toISOString());
        console.log('[AuthMiddleware] Received Token:', token);
        try {
            const decoded = jwt.decode(token);
            console.log('[AuthMiddleware] Received Payload Exp (UTC Timestamp):', decoded?.exp);
            if (decoded?.exp) {
                console.log('[AuthMiddleware] Received Expiry Date:', new Date(decoded.exp * 1000).toISOString());
            }
        } catch (decodeError) {
            console.error('[AuthMiddleware] Error decoding received token:', decodeError);
        }
        // Fin logs

        // Buscar usuario por ID
        const user = await User.findById(payload.sub).lean();

        if (!user) {
            console.warn(`[authMiddleware] Usuario no encontrado en la DB para sub: ${payload.sub}`);
            return res.status(401).json({ error: 'Unauthorized', message: 'User not found' });
        }

        // Añadir info básica a la request
        req.userId = payload.sub;
        req.userRole = payload.role;

        // Si es fotógrafo, buscar y añadir su photographerId
        if (user.role === 'photographer') {
            const photographer = await Photographer.findOne({ user: user._id }).lean();
            if (photographer) {
                req.photographerId = photographer._id.toString();
                console.log('[AuthMiddleware] Added photographerId:', req.photographerId);
            } else {
                console.warn('[AuthMiddleware] No photographer profile found for user:', user._id);
            }
        }

        // Llamar a next() para pasar al siguiente handler
        next();

    } catch (error) {
        // Manejo de errores del middleware (principalmente errores de jwt.verify)
        console.error('[authMiddleware] Error:', error.name, error.message);

        let statusCode = 401;
        let errorMessage = 'Authentication failed';
        // Ya no deberíamos ver TokenExpiredError aquí
        if (error.name === 'TokenExpiredError') {
            errorMessage = 'Token has expired (unexpected)';
        } else if (error.name === 'JsonWebTokenError') {
            errorMessage = 'Invalid token signature or format';
        }

        return res.status(statusCode).json({ error: 'Unauthorized', message: errorMessage });
    }
};
