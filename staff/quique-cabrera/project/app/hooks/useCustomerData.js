import { useEffect, useState } from 'react';
import { sessionsApi } from '../logic';
import useAuth from '../logic/hooks/useAuth';
import useApiRequest from '../logic/hooks/useApiRequest';

export default function useCustomerData() {
    const [sessions, setSessions] = useState([]);
    const [availability, setAvailability] = useState([]);

    // Usar hook compartido de autenticación
    const { user, isAuthenticated, isAuthorized } = useAuth('customer');
    const { executeRequest } = useApiRequest();

    // Cargar datos iniciales cuando el usuario está autenticado
    useEffect(() => {
        if (isAuthenticated && isAuthorized) {
            fetchSessions();
        }
    }, [isAuthenticated, isAuthorized]);

    // Función para obtener sesiones
    const fetchSessions = () => {
        executeRequest(
            (token) => sessionsApi.getCustomerSessions(token),
            setSessions,
            { errorMessage: 'Error al obtener sesiones' }
        );
    };

    // Función para obtener disponibilidad
    const fetchAvailability = (photographerId) => {
        if (!photographerId) {
            console.error('Se requiere photographerId para obtener la disponibilidad');
            return;
        }

        executeRequest(
            (token) => sessionsApi.getAvailability(token, photographerId),
            setAvailability,
            { errorMessage: 'Error al obtener disponibilidad' }
        );
    };

    return {
        name: user?.name || '',
        id: user?.id || '',
        sessions,
        availability,
        fetchAvailability,
        fetchSessions
    };
}