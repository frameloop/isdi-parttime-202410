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
            fetchAvailability();
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
    const fetchAvailability = () => {
        executeRequest(
            (token) => sessionsApi.getAvailability(token),
            setAvailability,
            { errorMessage: 'Error al obtener disponibilidad' }
        );
    };

    return {
        name: user?.name || '',
        sessions,
        availability,
        fetchSessions,
        fetchAvailability
    };
}