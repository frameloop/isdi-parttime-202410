import logic from '../index.js'; // Ajustar ruta si es necesario
import executeLogic from '../../helpers/executeLogic.js';

const authenticateUserLogic = async (req) => {
    const { username, password } = req.body;

    // Validaciones iniciales
    if (!username || !password) {
        return {
            error: { error: 'BadRequest', message: 'Usuario y contraseña son requeridos' },
            status: 400
        };
    }

    const result = await executeLogic(
        logic.authenticateUser, // Asegúrate que logic.authenticateUser exista y apunte a la lógica correcta
        [username, password],
        200
    );

    if (result.data) {
        const user = result.data;
        // Se asume que la lógica subyacente (logic.authenticateUser) devuelve el usuario completo
        return {
            data: {
                success: true,
                message: 'Usuario autenticado exitosamente',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    photographerId: user.photographerId
                }
            },
            status: result.status
        };
    }

    return result;
};

export default authenticateUserLogic; 