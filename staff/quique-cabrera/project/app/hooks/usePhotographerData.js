import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function usePhotographerData() {
    const [name, setName] = useState('');
    const [photographerId, setPhotographerId] = useState('');
    const [availability, setAvailability] = useState([]);
    const [sessions, setSessions] = useState([]);

    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedName = localStorage.getItem('name');
        const storedPhotographerId = localStorage.getItem('photographerId');

        if (!token || !storedName || !storedPhotographerId) {
            navigate('/login');
        } else {
            setName(storedName);
            setPhotographerId(storedPhotographerId);
        }
    }, [navigate]);

    useEffect(() => {
        if (photographerId) {
            fetchAvailability();
            fetchSessions();
        }
    }, [photographerId]);

    const fetchAvailability = async () => {
        const token = localStorage.getItem('token');
        if (!token || !photographerId) return;
        try {
            const res = await fetch(`${API_URL}/sessions/availability/${photographerId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setAvailability(data);
        } catch (err) {
            console.error('Error cargando disponibilidad:', err);
        }
    };

    const fetchSessions = async () => {
        const token = localStorage.getItem('token');
        if (!token || !photographerId) return;
        try {
            const res = await fetch(`${API_URL}/sessions/my-sessions`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Error al cargar sesiones');
            const data = await res.json();
            setSessions(data);
        } catch (err) {
            console.error('Error cargando sesiones:', err);
        }
    };

    return {
        name,
        photographerId,
        availability,
        sessions,
        fetchAvailability,
        fetchSessions
    };
}
