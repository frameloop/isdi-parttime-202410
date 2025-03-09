import { blacklistToken } from '../data/tokenBlackList.js'; // Importamos la función para agregar tokens a la blacklist

export default (req, res, next) => {
    try {
        console.log('🟢 [Logout] Request received'); // Log para indicar que la petición de logout ha sido recibida

        const authHeader = req.headers.authorization;

        // 📌 Verificar que el encabezado Authorization existe y tiene el formato correcto
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.warn('⚠ [Logout] No token provided in request');
            return res.status(401).json({ error: 'No token provided' });
        }

        // 🔍 Extraer el token de la cabecera
        const token = authHeader.split(' ')[1];
        console.log(`🔎 [Logout] Token received: ${token}`);

        // 🚫 Agregar el token a la blacklist para invalidarlo
        blacklistToken(token);
        console.log(`🛑 [Logout] Token added to blacklist: ${token}`);

        // ✅ Respuesta de éxito confirmando que el usuario ha cerrado sesión
        res.json({ success: true, message: 'User logged out' });
        console.log('✅ [Logout] User successfully logged out');

    } catch (error) {
        console.error('❌ [Logout] Error during logout:', error);
        next(error); // Pasar el error al manejador global de errores
    }
};
