import { errors } from 'com';

// 📌 Destructuración de los diferentes tipos de errores manejados
const { ValidationError, SystemError, DuplicityError, CredentialsError, NotFoundError, OwnershipError } = errors;

/**
 * 🚨 Middleware de manejo de errores.
 * @param {Error} error - Objeto de error capturado.
 * @param {Request} req - Objeto de solicitud (Request).
 * @param {Response} res - Objeto de respuesta (Response).
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
export default (error, req, res, next) => {
    console.error(`🚨 [errorHandler] Error detected: ${error.constructor.name} - ${error.message}`);

    if (error instanceof NotFoundError) {
        console.log('⚠ [errorHandler] Handling NotFoundError');
        res.status(404).json({ error: error.constructor.name, message: error.message });
    } else if (error instanceof OwnershipError) {
        console.log('⚠ [errorHandler] Handling OwnershipError');
        res.status(403).json({ error: error.constructor.name, message: error.message });
    } else if (error instanceof CredentialsError) {
        console.log('⚠ [errorHandler] Handling CredentialsError');
        res.status(401).json({ error: error.constructor.name, message: error.message });
    } else if (error instanceof DuplicityError) {
        console.log('⚠ [errorHandler] Handling DuplicityError');
        res.status(409).json({ error: error.constructor.name, message: error.message });
    } else if (error instanceof ValidationError) {
        console.log('⚠ [errorHandler] Handling ValidationError');
        res.status(400).json({ error: error.constructor.name, message: error.message });
    } else if (error instanceof SystemError) {
        console.log('⚠ [errorHandler] Handling SystemError');
        res.status(500).json({ error: error.constructor.name, message: error.message });
    } else {
        console.log('⚠ [errorHandler] Handling Unknown Error as SystemError');
        res.status(500).json({ error: SystemError.name, message: error.message });
    }
};
