import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useCustomerData() {
    const [name, setName] = useState('');
    const [sessions, setSessions] = useState([]);
    const [availability, setAvailability] = useState([]);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const storedName = localStorage.getItem('name')?.split('(')[0].trim();
        if (!storedName || !token) {
            navigate('/login');
        } else {
            setName(storedName);
            fetchSessions();
            fetchAvailability();
        }
    }, [navigate]);

    const fetchSessions = () => {
        if (!token) return;
        fetch(`${API_URL}/sessions/my-sessions`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setSessions)
            .catch(console.error);
    };

    const fetchAvailability = () => {
        if (!token) return;
        fetch(`${API_URL}/sessions/availability`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setAvailability)
            .catch(console.error);
    };

    return {
        name,
        sessions,
        availability,
        fetchSessions,
        fetchAvailability
    };
}
