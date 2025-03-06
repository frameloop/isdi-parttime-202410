import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../data/tokenBlackList.js'; // 🔹 Ruta ajustada

export default (req, res, next) => {
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

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.sub;

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
