import { DuplicityError, CredentialsError, NotFoundError, SystemError, /* ContentError */ } from 'com';

/**
 * Ejecuta una función de lógica de negocio, manejando errores comunes y formateando la respuesta.
 * @param {Function} logicFn La función de lógica de negocio a ejecutar.
 * @param {Array} args Un array con los argumentos a pasar a logicFn.
 * @param {number} successStatus El código de estado HTTP para respuestas exitosas (por defecto 200).
 * @returns {Promise<Object>} Un objeto con { data, status } en caso de éxito, o { error, status } en caso de error.
 */
const executeLogic = async (logicFn, args = [], successStatus = 200) => {
    try {
        const result = await logicFn(...args);
        return {
            data: result,
            status: successStatus
        };
    } catch (error) {
        let status = 500;
        let message = 'Internal Server Error';
        let errorType = error.constructor.name;

        if (error instanceof DuplicityError) {
            status = 409;
            message = error.message || 'El recurso ya existe.';
        } else if (error instanceof CredentialsError) {
            status = 401;
            message = error.message || 'Credenciales inválidas.';
        } else if (error instanceof NotFoundError) {
            status = 404;
            message = error.message || 'Recurso no encontrado.';
            // } else if (error instanceof ContentError) { // Comentado - ContentError no parece existir
            //     status = 400;
            //     message = error.message || 'Datos de entrada inválidos.';
        } else if (error instanceof SystemError) {
            console.error('System Error:', error);
            message = error.message || 'Ocurrió un error inesperado en el sistema.';
        } else {
            console.error('Unhandled Error:', error);
            message = 'Ocurrió un error inesperado.';
            errorType = 'UnhandledError';
        }

        return {
            error: { error: errorType, message: message },
            status: status
        };
    }
};

export default executeLogic; 