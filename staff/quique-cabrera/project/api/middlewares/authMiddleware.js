import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../data/tokenBlackList.js';
import { User } from '../data/models.js';

export default async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.warn('[authMiddleware] No authorization header or invalid format.');
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // 🔍 Extraer el token
        const token = authHeader.split(' ')[1];
        console.log('[authMiddleware] Token recibido:', token);

        // 🚫 Verificar si el token está en la blacklist
        if (isTokenBlacklisted(token)) {
            console.warn(`[authMiddleware] Token bloqueado: ${token}`);
            return res.status(401).json({ error: 'Token is invalidated' });
        }

        // 🔑 Intentar decodificar el token
        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log('[authMiddleware] Token decodificado:', payload);
        } catch (err) {
            console.error('[authMiddleware] Error al verificar token:', err.message);
            return res.status(401).json({ error: 'Invalid token' });
        }

        // 🔍 Buscar el usuario en la base de datos
        console.log(`[authMiddleware] Buscando usuario con ID: ${payload.sub}`);
        const user = await User.findById(payload.sub);

        if (!user) {
            console.error(`[authMiddleware] Usuario no encontrado en la BD: ${payload.sub}`);
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }

        // ✅ Usuario autenticado correctamente
        req.user = user;
        console.log(`[authMiddleware] Usuario autenticado: ${user._id} - Rol: ${user.role}`);
        next();
    } catch (error) {
        console.error('[authMiddleware] Error en autenticación:', error);
        return res.status(401).json({ error: 'Authentication failed' });
    }
};
