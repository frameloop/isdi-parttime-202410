import jwt from 'jsonwebtoken';
import { blacklistToken } from '../data/tokenBlacklist.js'; // 🔹 Importamos la lista negra de tokens

export default (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        // 🔹 Guardamos el token en la lista de tokens inválidos
        blacklistToken(token);

        res.json({ success: true, message: 'User logged out' });
    } catch (error) {
        next(error);
    }
};
