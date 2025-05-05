import logic from '../../../logic/index.js'
import { handleAuthError } from '../../../logic/auth/authUtils.js'; // Importar para manejo de errores

export default async (req, res, next) => {
    try {
        // Extraer username y password del cuerpo de la solicitud
        const { username, password } = req.body;

        // Validar que ambos campos existen
        if (!username || !password) {
            return res.status(400).json({ error: 'BadRequest', message: 'Username and password are required' });
        }

        // Llamar a la lógica con los argumentos correctos
        const result = await logic.loginUserLogic(username, password);

        // Verificar si la lógica devolvió un error conocido (ej. NotFound, Credentials)
        if (result.error) {
            return res.status(result.status || 401).json(result.error);
        }

        // Si la lógica fue exitosa, devolver los datos (token, etc.)
        res.json(result);

    } catch (error) {
        // Capturar errores inesperados (ej. SystemError de la lógica, errores de red)
        // Usar el manejador de errores global
        next(error);
    }
};