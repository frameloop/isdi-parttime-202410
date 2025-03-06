import { User } from '../../../data/models.js';  // ✅ Correcto (sube más niveles)
import sendRecoveryEmail from '../../../logic/sendRecoveryEmail.js'

export default async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) return res.status(400).json({ error: 'Username is required' });

        // 🔹 Busca el usuario en la base de datos
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // 🔹 Envía el email de recuperación
        await sendRecoveryEmail(user.email);

        console.log(`✅ Recovery email sent to ${user.email}`);
        return res.json({ success: true, message: 'Recovery email sent' });

    } catch (error) {
        console.error("🚨 Error in recover password:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
