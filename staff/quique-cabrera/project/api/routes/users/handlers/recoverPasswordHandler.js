import { User } from '../../../data/models.js';
import sendRecoveryEmail from '../../../logic/sendRecoveryEmail.js';

export default async (req, res) => {
    try {
        const { username } = req.body;
        console.log(`➡️  Entrando a recoverPasswordHandler con username: ${username}`);
        if (!username || typeof username !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing username' });
        }
        console.log(`➡️  Entrando a recoverPasswordHandler con username: ${username}`);
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        await sendRecoveryEmail(user.email);
        return res.json({ success: true, message: 'Recovery email sent' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};