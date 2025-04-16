import { useState } from 'react';
import { usersApi } from '../index';

/**
 * Hook para manejar peticiones a la API con estado de carga y errores
 * @returns {Object} Funciones y estado para manejar peticiones API
 */
export default function useApiRequest() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Realizar una petición API con manejo de estado
     * @param {Function} apiCall - Función de API a ejecutar
     * @param {Function} onSuccess - Callback a ejecutar en caso de éxito
     * @param {Object} options - Opciones adicionales
     * @returns {Promise} Resultado de la petición
     */
    const executeRequest = async (apiCall, onSuccess, options = {}) => {
        const { showLoading = true, errorMessage = 'Error en la petición' } = options;

        if (showLoading) {
            setLoading(true);
        }

        setError(null);

        try {
            const token = usersApi.getToken();
            if (!token) throw new Error('No estás autenticado');

            const result = await apiCall(token);

            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(result);
            }

            return result;
        } catch (err) {
            const message = err.message || errorMessage;
            setError(message);
            console.error(message, err);
            throw err;
        } finally {
            if (showLoading) {
                setLoading(false);
            }
        }
    };

    return {
        loading,
        error,
        executeRequest
    };
} 