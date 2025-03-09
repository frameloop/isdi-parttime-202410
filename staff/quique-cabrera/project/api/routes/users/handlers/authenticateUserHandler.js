import logic from '../../../logic/index.js';
import jwt from 'jsonwebtoken';
import { User } from '../../../data/models.js';

export default (req, res, next) => {
    try {
        console.log('🟢 [authenticateUserHandler] Request received');

        const { username, password } = req.body;
        console.log('🔍 [authenticateUserHandler] Username:', username);
        console.log('🔍 [authenticateUserHandler] Password:', password ? 'Received' : 'Missing');

        if (!username || !password) {
            console.error('❌ [authenticateUserHandler] Missing username or password');
            return res.status(400).json({ error: 'BadRequest', message: 'Missing username or password' });
        }

        logic.authenticateUser(username, password)
            .then(userId => {
                console.log('🟢 [authenticateUserHandler] User authenticated:', userId);

                return User.findById(userId).select('role');
            })
            .then(user => {
                if (!user) {
                    console.error('❌ [authenticateUserHandler] User not found after authentication');
                    return res.status(404).json({ error: 'UserNotFound', message: 'User not found' });
                }

                console.log('🔍 [authenticateUserHandler] Found user:', user);

                const token = jwt.sign(
                    { sub: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.json({ token });
            })
            .catch(error => {
                console.error('❌ [authenticateUserHandler] Error during authentication:', error.message);
                // Manejar específicamente el error de credenciales inválidas
                if (error.message.includes('bcrypt: wrong credentials')) {
                    return res.status(401).json({
                        error: 'InvalidCredentials',
                        message: 'Usuario o contraseña incorrectos'
                    });
                }
                // Para otros errores (no relacionados con credenciales), pasar al middleware
                next(error);
            });
    } catch (error) {
        console.error('❌ [authenticateUserHandler] Unexpected error:', error.message);
        next(error);
    }
};