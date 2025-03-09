import verifyUserExists from '../../../logic/verifyUserExists.js'; // Importa la función para verificar si un usuario existe

// Handler para verificar si un usuario existe en el sistema
export default (req, res, next) => {
    try {
        // Registrar el cuerpo de la solicitud para depuración
        console.log("📡 Cuerpo de la solicitud recibido:", req.body);

        // Validar que el cuerpo de la solicitud exista y sea un objeto
        if (!req.body || typeof req.body !== 'object') {
            console.warn("⚠ Cuerpo de la solicitud inválido o ausente:", req.body);
            throw new Error('Invalid request body');
        }
        console.log("✅ Cuerpo de la solicitud válido");

        // Extraer el username del cuerpo de la solicitud
        const { username } = req.body;
        console.log(`👤 Username extraído: ${username || 'No username provided'}`);

        // Verificar si el usuario existe usando la función verifyUserExists
        console.log(`🔍 Verificando si existe el usuario: ${username}`);
        verifyUserExists(username)
            .then(response => {
                // Si no se encuentra el usuario, devolver un error 404
                if (!response) {
                    console.warn(`⚠ Usuario no encontrado: ${username}`);
                    return res.status(404).json({ error: 'User not found' });
                }
                // Si el usuario existe, devolver la respuesta
                console.log(`✅ Usuario encontrado: ${username}`);
                console.log("📤 Enviando respuesta:", response);
                res.json(response);
            })
            .catch(error => {
                console.warn(`⚠ Error al verificar usuario: ${username}`);
                console.log(`❌ Detalle del error en promise: ${error.message}`);
                next(error);
            });
    } catch (error) {
        console.error("🚨 Error en la verificación de usuario:", error);
        console.log(`❌ Detalle del error en try-catch: ${error.message}`);
        next(error);
    }
};