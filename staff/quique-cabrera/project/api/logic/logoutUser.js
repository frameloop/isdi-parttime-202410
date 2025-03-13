import { blacklistToken } from '../data/tokenBlackList.js';

export default (req, res, next) => {
    try {
        console.log('[Logout] Request received');

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.warn('[Logout] No token provided in request');
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        console.log(`[Logout] Token received: ${token}`);

        blacklistToken(token);
        console.log(`[Logout] Token added to blacklist: ${token}`);

        res.json({ success: true, message: 'User logged out' });

    } catch (error) {
        console.error('[Logout] Error during logout:', error);
        next(error);
    }
};
