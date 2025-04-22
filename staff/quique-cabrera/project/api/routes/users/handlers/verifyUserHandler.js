import logic from '../../../logic/index.js'

// Este handler ahora verifica la existencia de un USERNAME
export default async (req, res, next) => {
    console.log('verifyUserHandler received request (expecting username)'); // Log actualizado
    try {
        // Revertir a extraer username
        const { username } = req.body;

        // Validar que se recibe el username
        if (!username) {
            console.error('verifyUserHandler: Username not provided in request body');
            return res.status(400).json({ error: 'BadRequest', message: 'Username is required' });
        }

        console.log(`verifyUserHandler attempting to verify username: ${username}`);
        // Pasar username a la lógica
        const userDetails = await logic.verifyUserLogic(username); // La lógica ahora espera username

        console.log(`verifyUserHandler successful for username: ${username}, returning user details.`);
        res.json(userDetails); // Devolver los detalles del usuario si existe
    } catch (error) {
        console.error(`Error in verifyUserHandler for username: ${req.body.username || 'N/A'}`, error); // Log del error
        next(error); // Pasar el error al manejador global
    }
};