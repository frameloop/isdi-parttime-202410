import jwt from 'jsonwebtoken';
import { User } from '../data/models.js';

export default async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.warn('[authMiddleware] Token no presente o mal formado');
            return res.status(401).json({ error: 'Unauthorized: Missing or malformed token' });
        }

        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        console.log('[authMiddleware] Payload del token:', payload);

        const user = await User.findById(payload.sub);

        if (!user) {
            console.warn('[authMiddleware] Usuario no encontrado en la DB');
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }

        req.user = {
            ...user.toObject(),
            role: payload.role
        };

        console.log('[authMiddleware] Usuario fusionado con rol:', req.user);

        next();
    } catch (error) {
        console.error('[authMiddleware] Error:', error);
        return res.status(401).json({ error: 'Authentication failed' });
    }
};
