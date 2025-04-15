import logic from '../logic/index.js'
import jwt from 'jsonwebtoken'
import { Photographer } from '../data/models.js'

const loginUserLogic = async (req) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return {
                error: {
                    error: 'ValidationError',
                    message: 'Username and password are required'
                },
                status: 400
            };
        }

        const user = await logic.authenticateUser(username, password);

        if (!user) {
            return {
                error: {
                    error: 'AuthenticationFailed',
                    message: 'Usuario o contraseña incorrectos'
                },
                status: 401
            };
        }

        const payload = { sub: user._id.toString(), role: user.role };
        const response = {
            token: null,
            userId: user._id.toString(),
            name: user.name,
            role: user.role
        };

        if (user.role === 'photographer') {
            const photographer = await Photographer.findOne({ user: user._id }).select('_id');
            if (photographer) {
                payload.photographerId = photographer._id.toString();
                response.photographerId = photographer._id.toString();
            }
        }

        response.token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { data: response };
    } catch (error) {
        console.error('Error en loginUserLogic:', error);
        return {
            error: {
                error: 'ServerError',
                message: 'Internal server error'
            },
            status: 500
        };
    }
};

export default loginUserLogic;