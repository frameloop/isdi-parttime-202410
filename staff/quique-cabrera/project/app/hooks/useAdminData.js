import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAdminData() {
    const [name, setName] = useState('');
    const [photographers, setPhotographers] = useState([]);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const storedName = localStorage.getItem('name')?.replace(/\s*\\(\\d+\\)$/, '');
        if (!storedName || !token) return navigate('/login');

        setName(storedName);
        fetchPhotographers();
    }, [navigate]);

    const fetchPhotographers = () => {
        fetch(`${API_URL}/users/photographers`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setPhotographers)
            .catch(console.error);
    };

    const logout = () => {
        fetch(`${API_URL}/users/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .finally(() => {
                localStorage.clear();
                navigate('/login');
            });
    };

    const addPhotographer = (photographerData) => {
        return fetch(`${API_URL}/users/photographers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(photographerData)
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(newPhotographer => {
                setPhotographers(prev => [...prev, newPhotographer]);
                return newPhotographer;
            });
    };

    const deletePhotographer = (id) => {
        return fetch(`${API_URL}/users/photographers/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(() => {
                setPhotographers(prev => prev.filter(p => p._id !== id));
            });
    };

    return {
        name,
        photographers,
        fetchPhotographers,
        addPhotographer,
        deletePhotographer,
        logout
    };
}
