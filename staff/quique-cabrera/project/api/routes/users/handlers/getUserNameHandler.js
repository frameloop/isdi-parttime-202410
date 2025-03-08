import logic from '../../../logic/index.js';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try {
        console.log('🟢 [authenticateUserHandler] Request received');

        // Extraemos los datos del cuerpo de la petición
        const { username, password } = req.body;

        // Depuración: Verificamos que se están recibiendo los valores correctamente
        console.log(`🟢 [authenticateUserHandler] Username: ${username}`);
        console.log(`🟢 [authenticateUserHandler] Password: ${password ? 'Received' : 'Missing'}`);

        // Validamos que ambos campos estén presentes
        if (!username || !password) {
            console.error('❌ [authenticateUserHandler] Missing username or password');
            return res.status(400).json({ error: "ValidationError", message: "Username and password are required" });
        }

        // Llamamos a la lógica de autenticación
        logic.authenticateUser(username, password)
            .then(user => {
                // Si la autenticación falla, lanzamos un error
                if (!user) {
                    console.error('❌ [authenticateUserHandler] Authentication failed');
                    throw new Error("Authentication failed");
                }

                console.log(`🟢 [authenticateUserHandler] User authenticated: ${user.username}`);

                // Creamos el payload para el token JWT
                const payload = { sub: user._id, role: user.role };

                // Firmamos el token con una expiración de 1 hora
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

                console.log('🟢 [authenticateUserHandler] Token generated successfully');

                // Enviamos el token y el rol del usuario como respuesta
                res.json({ token, role: user.role });
            })
            .catch(error => {
                console.error('❌ [authenticateUserHandler] Error during authentication:', error);
                next(error);
            });

    } catch (error) {
        console.error('❌ [authenticateUserHandler] Unexpected error:', error);
        next(error);
    }
};
