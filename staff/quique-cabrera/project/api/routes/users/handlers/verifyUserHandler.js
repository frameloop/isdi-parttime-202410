import logic from '../../../logic/index.js'

// Este handler ahora verifica la existencia de un USERNAME
export default async (req, res, next) => {
    try {
        // Revertir a extraer username
        const { username } = req.body;

        // Validar que se recibe el username
        if (!username) {
            return res.status(400).json({ error: 'BadRequest', message: 'Username is required' });
        }

        // Pasar username a la lógica
        const userDetails = await logic.verifyUserLogic(username); // La lógica ahora espera username

        res.json(userDetails); // Devolver los detalles del usuario si existe
    } catch (error) {
        next(error); // Pasar el error al manejador global
    }
};