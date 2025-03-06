import { blacklistToken } from '../../../data/tokenBlackList.js'; // ✅ Correcto (sube dos niveles)

export default async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!req.userId) {
            console.warn("⚠ Logout requested, but no user ID found.");
            return res.status(400).json({ error: 'User ID missing in request' });
        }

        if (!token) {
            console.warn("⚠ Logout requested, but no token provided.");
            return res.status(400).json({ error: 'Token missing in request' });
        }

        console.log(`🔹 Logout requested for user ID: ${req.userId}`);

        // 🛑 Añadir el token a la lista negra para invalidarlo
        blacklistToken(token);
        console.log(`🚫 Token blacklisted: ${token}`);

        console.log("✅ Logout successful.");
        return res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        console.error("🚨 Error during logout:", error);
        return res.status(500).json({ error: 'Server error on logout' });
    }
};
