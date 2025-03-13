import logic from '../../../logic/index.js';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try {
        console.log('[getUserNameHandler] Request received');

        const { username, password } = req.body;

        console.log(`[getUserNameHandler] Username: ${username}`);
        console.log(`[getUserNameHandler] Password: ${password ? 'Received' : 'Missing'}`);

        if (!username || !password) {
            console.error('[getUserNameHandler] Missing username or password');
            return res.status(400).json({ error: "ValidationError", message: "Username and password are required" });
        }

        logic.authenticateUser(username, password)
            .then(user => {
                if (!user) {
                    console.error('[getUserNameHandler] Authentication failed');
                    throw new Error("Authentication failed");
                }

                console.log(`[getUserNameHandler] User authenticated: ${user.username}`);

                const payload = { sub: user._id, role: user.role };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

                console.log('[getUserNameHandler] Token generated successfully');
                res.json({ token, role: user.role });
            })
            .catch(error => {
                console.error('[getUserNameHandler] Error during authentication:', error);
                next(error);
            });

    } catch (error) {
        console.error('[getUserNameHandler] Unexpected error:', error);
        next(error);
    }
};