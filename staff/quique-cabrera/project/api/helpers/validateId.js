import { SystemError } from './SystemError.js';

/**
 * Valida que un ID tenga el formato correcto de MongoDB
 * @param {string} id - ID a validar
 * @throws {SystemError} Si el ID no tiene el formato correcto
 */
export const validateId = (id) => {
    const mongoIdPattern = /^[0-9a-fA-F]{24}$/;

    if (!id || typeof id !== 'string' || !mongoIdPattern.test(id)) {
        throw new SystemError('ID inválido');
    }
}; 