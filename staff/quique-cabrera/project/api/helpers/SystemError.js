/**
 * Error personalizado para el sistema
 * @extends Error
 */
export class SystemError extends Error {
    /**
     * @param {string} message - Mensaje de error
     * @param {number} [status=500] - Código de estado HTTP
     */
    constructor(message, status = 500) {
        super(message);
        this.name = 'SystemError';
        this.status = status;
    }
} 