import verifyUserExists from '../../../logic/verifyUserExists.js';

export default (req, res, next) => {
    try {
        console.log("Cuerpo de la solicitud recibido:", req.body);

        if (!req.body || typeof req.body !== 'object') {
            console.warn("Cuerpo de la solicitud inválido o ausente:", req.body);
            throw new Error('Invalid request body');
        }
        console.log("Cuerpo de la solicitud válido");

        const { username } = req.body;
        console.log(`Username extraído: ${username || 'No username provided'}`);

        console.log(`Verificando si existe el usuario: ${username}`);
        verifyUserExists(username)
            .then(response => {
                if (!response) {
                    console.warn(`Usuario no encontrado: ${username}`);
                    return res.status(404).json({ error: 'User not found' });
                }
                console.log(`Usuario encontrado: ${username}`);
                console.log("Enviando respuesta:", response);
                res.json(response);
            })
            .catch(error => {
                console.warn(`Error al verificar usuario: ${username}`);
                console.log(`Detalle del error en promise: ${error.message}`);
                next(error);
            });
    } catch (error) {
        console.error("Error en la verificación de usuario:", error);
        console.log(`Detalle del error en try-catch: ${error.message}`);
        next(error);
    }
};