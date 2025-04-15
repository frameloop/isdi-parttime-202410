import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchPhotographerAvailability from '../logic/photographerAvailability.js';
import fetchPhotographerSessions from '../logic/photographerSessions.js';

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
            fetchPhotographerAvailability(API_URL, photographerId, setAvailability);
            fetchPhotographerSessions(API_URL, photographerId, setSessions);
        }
    }, [photographerId]);

    return {
        name,
        photographerId,
        availability,
        sessions,
        fetchAvailability: () => fetchPhotographerAvailability(API_URL, photographerId, setAvailability),
        fetchSessions: () => fetchPhotographerSessions(API_URL, photographerId, setSessions)
    };
}