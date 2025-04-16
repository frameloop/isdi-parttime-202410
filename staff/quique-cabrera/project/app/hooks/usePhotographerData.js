import { useEffect, useState } from 'react';
import { photographersApi } from '../logic';
import useAuth from '../logic/hooks/useAuth';
import useApiRequest from '../logic/hooks/useApiRequest';

export default function usePhotographerData() {
    const [availability, setAvailability] = useState([]);
    const [sessions, setSessions] = useState([]);

    // Usar hook compartido de autenticación
    const { user, isAuthenticated, isAuthorized } = useAuth('photographer');
    const { executeRequest } = useApiRequest();

    // Cargar datos iniciales cuando el usuario está autenticado
    useEffect(() => {
        if (isAuthenticated && isAuthorized && user?.photographerId) {
            fetchAvailability();
            fetchSessions();
        }
    }, [isAuthenticated, isAuthorized, user]);

    // Función para obtener disponibilidad
    const fetchAvailability = () => {
        if (!user?.photographerId) return;

        executeRequest(
            (token) => photographersApi.getAvailability(token, user.photographerId),
            setAvailability,
            { errorMessage: 'Error al obtener disponibilidad' }
        );
    };

    // Función para obtener sesiones
    const fetchSessions = () => {
        if (!user?.photographerId) return;

        executeRequest(
            (token) => photographersApi.getSessions(token),
            setSessions,
            { errorMessage: 'Error al obtener sesiones' }
        );
    };

    return {
        name: user?.name || '',
        photographerId: user?.photographerId || '',
        availability,
        sessions,
        fetchAvailability,
        fetchSessions
    };
}