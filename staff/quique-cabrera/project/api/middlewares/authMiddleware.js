import jwt from 'jsonwebtoken';
import { User, Photographer } from '../data/models.js';

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized', message: 'Missing or malformed token' });
        }

        const token = authHeader.split(' ')[1];

        // Verificar token (ignorar expiración según lo acordado)
        const payload = jwt.verify(token, process.env.JWT_SECRET, {
            clockTolerance: 60,
            ignoreExpiration: true // Ignorar la caducidad del token
        });

        // Buscar usuario por ID
        const user = await User.findById(payload.sub).lean();

        if (!user) {
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
            }
        }

        // Llamar a next() para pasar al siguiente handler
        next();

    } catch (error) {
        // Manejo de errores del middleware (principalmente errores de jwt.verify)
        console.error('[authMiddleware] Error:', error.name, error.message);

        let statusCode = 401;
        let errorMessage = 'Authentication failed';
        if (error.name === 'TokenExpiredError') {
            errorMessage = 'Token has expired (unexpected)';
        } else if (error.name === 'JsonWebTokenError') {
            errorMessage = 'Invalid token signature or format';
        }

        return res.status(statusCode).json({ error: 'Unauthorized', message: errorMessage });
    }
};

export default authMiddleware;
