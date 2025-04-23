import { useEffect, useState } from 'react';
import { usersApi } from '../logic';
import useAuth from '../logic/hooks/useAuth';
import useApiRequest from '../logic/hooks/useApiRequest';
import createPhotographersApi from '../logic/api/photographers';

export default function usePhotographerData() {
    const [availability, setAvailability] = useState([]);
    const [sessions, setSessions] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;
    const photographersApi = createPhotographersApi(API_URL);

    // Usar hook compartido de autenticación
    const { user, isAuthenticated, isAuthorized } = useAuth('photographer');
    const { executeRequest } = useApiRequest();

    // Obtener el photographerId directamente de la sesión
    const photographerId = usersApi.getSession()?.photographerId || '';

    // Cargar datos iniciales cuando tenemos el ID del fotógrafo
    useEffect(() => {
        if (photographerId && isAuthenticated && isAuthorized) {
            console.log('Cargando datos iniciales para fotógrafo:', photographerId);
            fetchAvailability();
            fetchSessions();
        } else {
            console.log('No se pueden cargar datos:', {
                photographerId,
                isAuthenticated,
                isAuthorized
            });
        }
    }, [photographerId, isAuthenticated, isAuthorized]);

    // Función para obtener disponibilidad
    const fetchAvailability = async () => {
        if (!photographerId) {
            console.log('No hay photographerId para obtener disponibilidad');
            return;
        }

        try {
            const token = usersApi.getToken();
            if (!token) {
                console.error('No se encontró el token');
                return;
            }

            console.log('Obteniendo disponibilidad para:', photographerId);
            const data = await photographersApi.getAvailability(token, photographerId);
            console.log('Disponibilidad obtenida:', data);
            setAvailability(data);
        } catch (error) {
            console.error('Error al obtener disponibilidad:', error);
        }
    };

    // Función para obtener sesiones
    const fetchSessions = async () => {
        if (!photographerId) {
            console.log('No hay photographerId para obtener sesiones');
            return;
        }

        try {
            const token = usersApi.getToken();
            if (!token) {
                console.error('No se encontró el token');
                return;
            }

            console.log('Obteniendo sesiones');
            const data = await photographersApi.getSessions(token);
            console.log('Sesiones obtenidas (original):', data);

            // Formatear las sesiones para garantizar una estructura consistente
            const formattedSessions = data.map(session => {
                // Asegurarnos de que customer sea un objeto con las propiedades necesarias
                let customer = { name: 'Desconocido', phone: 'Desconocido' };

                if (session.customer) {
                    if (typeof session.customer === 'object') {
                        customer = {
                            ...customer,
                            ...session.customer
                        };
                    }
                }

                return {
                    ...session,
                    customer
                };
            });

            console.log('Sesiones formateadas:', formattedSessions);
            setSessions(formattedSessions);
        } catch (error) {
            console.error('Error al obtener sesiones:', error);
        }
    };

    return {
        name: user?.name || '',
        photographerId,
        availability,
        sessions,
        fetchAvailability,
        fetchSessions
    };
}