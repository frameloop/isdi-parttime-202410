import { blacklistToken } from '../../../data/tokenBlackList.js';

export default async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log(`Token extraído del encabezado: ${token || 'No token found'}`);

        if (!req.userId) {
            console.warn("Logout requested, but no user ID found.");
            return res.status(400).json({ error: 'User ID missing in request' });
        }
        console.log(`User ID encontrado en la solicitud: ${req.userId}`);

        if (!token) {
            console.warn("Logout requested, but no token provided.");
            return res.status(400).json({ error: 'Token missing in request' });
        }
        console.log(`Token válido recibido: ${token}`);

        console.log(`Logout requested for user ID: ${req.userId}`);

        blacklistToken(token);
        console.log(`Token blacklisted: ${token}`);

        console.log("Logout successful.");
        return res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        console.error("Error during logout:", error);
        console.log(`Detalle del error: ${error.message}`);
        return res.status(500).json({ error: 'Server error on logout' });
    }
};