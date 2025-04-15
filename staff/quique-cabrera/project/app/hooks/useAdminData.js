import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchPhotographersFn from '../logic/Photographers.js';
import addPhotographerFn from '../logic/addPhotographer.js';
import deletePhotographerFn from '../logic/deletePhotographer.js';
import logoutAdminUser from '../logic/logoutAdminUser';

export default function useAdminData() {
    const [name, setName] = useState('');
    const [photographers, setPhotographers] = useState([]);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const storedName = localStorage.getItem('name')?.replace(/\s*\(\d+\)$/, '');
        if (!storedName || !token) return navigate('/login');

        setName(storedName);
        fetchPhotographersFn(API_URL, token, setPhotographers);
    }, [navigate]);

    const fetchPhotographers = () => fetchPhotographersFn(API_URL, token, setPhotographers);
    const addPhotographer = (data) => addPhotographerFn(API_URL, token, data, setPhotographers);
    const deletePhotographer = (id) => deletePhotographerFn(API_URL, token, id, setPhotographers);
    const logout = () => logoutAdminUser(API_URL, token, navigate);

    return {
        name,
        photographers,
        fetchPhotographers,
        addPhotographer,
        deletePhotographer,
        logout
    };
}