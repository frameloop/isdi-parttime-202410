import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../data/tokenBlackList.js';
import { User } from '../data/models.js'; // Asegúrate de que la ruta es correcta

export default async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];

        // 🛑 Verificar si el token está en la blacklist
        if (isTokenBlacklisted(token)) {
            console.warn(`🚫 Token blocked: ${token}`);
            return res.status(401).json({ error: 'Token is invalidated' });
        }

        // 🔑 Verificar y decodificar el token
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // 🔍 Buscar al usuario en la base de datos
        const user = await User.findById(payload.sub);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }

        // ✅ Agregar el usuario completo al request
        req.user = user;

        next();
    } catch (error) {
        console.error('❌ [authMiddleware] Authentication error:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};
