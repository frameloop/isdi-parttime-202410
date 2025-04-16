import { useEffect, useState } from 'react';
import { photographersApi } from '../logic';
import useAuth from '../logic/hooks/useAuth';
import useApiRequest from '../logic/hooks/useApiRequest';

export default function useAdminData() {
    const [photographers, setPhotographers] = useState([]);

    // Usar hook compartido de autenticación
    const { user, isAuthenticated, isAuthorized, logout } = useAuth('administrator');
    const { executeRequest } = useApiRequest();

    // Cargar datos iniciales cuando el usuario está autenticado
    useEffect(() => {
        if (isAuthenticated && isAuthorized) {
            fetchPhotographers();
        }
    }, [isAuthenticated, isAuthorized]);

    // Función para obtener fotógrafos
    const fetchPhotographers = () => {
        executeRequest(
            (token) => photographersApi.getAll(token),
            setPhotographers,
            { errorMessage: 'Error al obtener fotógrafos' }
        );
    };

    // Función para añadir fotógrafo
    const addPhotographer = async (data) => {
        await executeRequest(
            (token) => photographersApi.add(token, data),
            null,
            { errorMessage: 'Error al añadir fotógrafo' }
        );
        await fetchPhotographers();
    };

    // Función para eliminar fotógrafo
    const deletePhotographer = async (id) => {
        await executeRequest(
            (token) => photographersApi.delete(token, id),
            () => setPhotographers(prev => prev.filter(p => p._id !== id)),
            { errorMessage: 'Error al eliminar fotógrafo' }
        );
    };

    return {
        name: user?.name || '',
        photographers,
        fetchPhotographers,
        addPhotographer,
        deletePhotographer,
        logout
    };
}