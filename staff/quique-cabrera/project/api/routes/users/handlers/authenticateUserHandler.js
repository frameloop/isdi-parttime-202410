import logic from '../../../logic/index.js';
import jwt from 'jsonwebtoken';
import { User, Photographer } from '../../../data/models.js';

export default (req, res, next) => {
    try {
        console.log('[authenticateUserHandler] Request received');

        const { username, password } = req.body;
        console.log('[authenticateUserHandler] Username:', username);
        console.log('[authenticateUserHandler] Password:', password ? 'Received' : 'Missing');

        if (!username || !password) {
            console.error('[authenticateUserHandler] Missing username or password');
            return res.status(400).json({ error: 'BadRequest', message: 'Missing username or password' });
        }

        logic.authenticateUser(username, password)
            .then(user => {
                if (!user) {
                    console.error('[authenticateUserHandler] User not found after authentication');
                    return res.status(404).json({ error: 'UserNotFound', message: 'User not found' });
                }

                console.log('[authenticateUserHandler] Found user:', user);

                if (user.role === 'photographer') {
                    return Photographer.findOne({ user: user._id }).select('_id')
                        .then(photographer => {
                            if (!photographer) {
                                console.error('[authenticateUserHandler] No photographer profile found');
                                return res.status(404).json({ error: 'NotFound', message: 'Photographer profile not found' });
                            }

                            console.log('[authenticateUserHandler] Found photographer:', photographer._id);

                            const token = jwt.sign(
                                { sub: user._id, role: user.role, photographerId: photographer._id.toString() },
                                process.env.JWT_SECRET,
                                { expiresIn: '1h' }
                            );

                            res.json({ token, name: user.name, role: user.role, photographerId: photographer._id.toString() });
                        });
                } else {
                    const token = jwt.sign(
                        { sub: user._id, role: user.role },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );

                    res.json({ token, name: user.name, role: user.role });
                }
            })
            .catch(error => {
                console.error('[authenticateUserHandler] Error during authentication:', error.message);
                if (error.message.includes('bcrypt: wrong credentials')) {
                    return res.status(401).json({
                        error: 'InvalidCredentials',
                        message: 'Usuario o contraseña incorrectos'
                    });
                }
                next(error);
            });
    } catch (error) {
        console.error('[authenticateUserHandler] Unexpected error:', error.message);
        next(error);
    }
};
