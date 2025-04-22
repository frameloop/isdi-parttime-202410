import { SystemError } from './SystemError.js';

/**
 * Extrae el ID del usuario del objeto request
 * @param {Object} req - Objeto request de Express
 * @returns {string} ID del usuario
 * @throws {SystemError} Si no hay ID de usuario en el request
 */
export const extractUserId = (req) => {
    if (!req.userId) {
        throw new SystemError('Usuario no autenticado', 401);
    }
    return req.userId;
}; 