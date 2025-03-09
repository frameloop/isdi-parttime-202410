import { blacklistToken } from '../../../data/tokenBlackList.js'; // Importamos la función para agregar tokens a la blacklist

// Handler para cerrar sesión (logout) de un usuario
export default async (req, res) => {
    try {
        // Extraer el token del encabezado de autorización (se espera en formato "Bearer <token>")
        const token = req.headers.authorization?.split(' ')[1];
        console.log(`📡 Token extraído del encabezado: ${token || 'No token found'}`);

        // Verificar si existe un userId en la solicitud (debe estar configurado por middleware de autenticación)
        if (!req.userId) {
            console.warn("⚠ Logout requested, but no user ID found.");
            return res.status(400).json({ error: 'User ID missing in request' });
        }
        console.log(`👤 User ID encontrado en la solicitud: ${req.userId}`);

        // Verificar si se proporcionó un token
        if (!token) {
            console.warn("⚠ Logout requested, but no token provided.");
            return res.status(400).json({ error: 'Token missing in request' });
        }
        console.log(`🔑 Token válido recibido: ${token}`);

        console.log(`🔹 Logout requested for user ID: ${req.userId}`);

        // 🛑 Añadir el token a la lista negra para invalidarlo
        blacklistToken(token);
        console.log(`🚫 Token blacklisted: ${token}`);

        console.log("✅ Logout successful.");
        return res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        console.error("🚨 Error during logout:", error);
        console.log(`❌ Detalle del error: ${error.message}`);
        return res.status(500).json({ error: 'Server error on logout' });
    }
};