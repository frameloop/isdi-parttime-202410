import logic from '../../../logic/index.js'
import { handleAuthError } from '../../../logic/auth/authUtils.js'; // Importar para manejo de errores

export const deletePhotographer = async (req, res, next) => {
    try {
        // Extraer el ID del fotógrafo de los parámetros de la ruta
        const { id: photographerId } = req.params;

        // Validar que el ID existe (básico)
        if (!photographerId) {
            // Este caso es improbable si la ruta está bien definida, pero por seguridad
            return res.status(400).json({ error: 'BadRequest', message: 'Photographer ID is required in the URL path' });
        }

        // Llamar a la lógica con el ID correcto
        const result = await logic.deletePhotographerLogic(photographerId);

        // Verificar si la lógica devolvió un error conocido (ej. NotFound)
        // La lógica actual lanza errores, así que irán al catch.
        // Este 'if' es por si la lógica devolviera { error, status } en el futuro.
        if (result && result.error) {
            return res.status(result.status || 400).json(result.error);
        }

        // Si la lógica fue exitosa, devolver el mensaje de éxito
        // La lógica devuelve { message: '...' } que asignamos a 'result'
        res.status(200).json(result); // Enviar el objeto { message: '...' } devuelto por la lógica

    } catch (error) {
        // Capturar errores lanzados por la lógica (NotFound, SystemError) u otros inesperados
        // Usar handleAuthError si es apropiado, o pasar al manejador global
        // const handledError = handleAuthError(error); 
        // res.status(handledError.status).json(handledError.error);
        next(error); // Pasar al errorHandler global
    }
};