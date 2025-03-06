import { User } from '../../../data/models.js';
import sendRecoveryEmail from '../../../logic/sendRecoveryEmail.js';

export default async (req, res) => {
    try {
        const { username } = req.body;

        if (!username || typeof username !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing username' });
        }

        // 🔹 Find user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 🔹 Send recovery email
        await sendRecoveryEmail(user.email);

        console.log(`✅ Recovery email sent to ${user.email}`);
        return res.json({ success: true, message: 'Recovery email sent' });

    } catch (error) {
        console.error("🚨 Error in recover password:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
