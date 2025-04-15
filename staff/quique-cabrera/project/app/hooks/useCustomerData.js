import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchCustomerSessions from '../logic/customerSessions.js';
import fetchCustomerAvailability from '../logic/customerAvailability.js';

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
            fetchCustomerSessions(API_URL, token, setSessions);
            fetchCustomerAvailability(API_URL, token, setAvailability);
        }
    }, [navigate]);

    const fetchSessions = () => fetchCustomerSessions(API_URL, token, setSessions);
    const fetchAvailability = () => fetchCustomerAvailability(API_URL, token, setAvailability);

    return {
        name,
        sessions,
        availability,
        fetchSessions,
        fetchAvailability
    };
}