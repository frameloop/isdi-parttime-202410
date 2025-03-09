import { User } from '../../../data/models.js'; // Importa el modelo User para interactuar con la base de datos
import sendRecoveryEmail from '../../../logic/sendRecoveryEmail.js'; // Importa la función para enviar correos de recuperación

// Handler para manejar la solicitud de recuperación de contraseña
export default async (req, res) => {
    try {
        // Extraer el username del cuerpo de la solicitud
        const { username } = req.body;
        console.log(`📩 Solicitud de recuperación recibida para el username: ${username || 'No username provided'}`);

        // Validar que username exista y sea una cadena
        if (!username || typeof username !== 'string') {
            console.warn(`⚠ Username inválido o ausente: ${username}`);
            return res.status(400).json({ error: 'Invalid or missing username' });
        }
        console.log(`✅ Username válido: ${username}`);

        // 🔹 Buscar usuario en la base de datos
        console.log(`🔍 Buscando usuario en la base de datos con username: ${username}`);
        const user = await User.findOne({ username });
        if (!user) {
            console.warn(`⚠ Usuario no encontrado: ${username}`);
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(`👤 Usuario encontrado: ${user.email}`);

        // 🔹 Enviar correo de recuperación
        console.log(`📧 Enviando correo de recuperación a: ${user.email}`);
        await sendRecoveryEmail(user.email);

        console.log(`✅ Correo de recuperación enviado a ${user.email}`);
        return res.json({ success: true, message: 'Recovery email sent' });

    } catch (error) {
        console.error("🚨 Error en la recuperación de contraseña:", error);
        console.log(`❌ Detalle del error: ${error.message}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
};