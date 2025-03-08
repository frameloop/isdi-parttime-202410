import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";


function HomeCustomer() {
    const [name, setName] = useState('');
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let storedName = localStorage.getItem('name');

        if (!storedName) {
            navigate('/login');
            return;
        }

        storedName = storedName.replace(/\s*\(\d+\)$/, '');
        setName(storedName);

        // Fetch sessions
        const token = localStorage.getItem('token');
        fetch(`${import.meta.env.VITE_API_URL}/customers/sessions`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setSessions(data))
            .catch(error => console.error('Error fetching sessions:', error));
    }, [navigate]);

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            }).catch(error => console.error('Logout error:', error));
        }
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/login');
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col items-center p-4">
            <header className="w-full flex justify-center items-center p-4 bg-black rounded-lg  text-white relative">
                <h1 className="text-xl font-bold">{name}</h1>
                <button onClick={handleLogout} className="bg-red-600 px-1 py-1 rounded absolute font-extrabold right-4"><MdOutlineLogout /></button>
            </header>

            <section className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4">
                <h2 className="text-lg font-bold text-gray-700 text-center">Sesiones Programadas</h2>
                {sessions.length > 0 ? (
                    <ul>
                        {sessions.map(session => (
                            <li key={session.id} className="p-2 border-b">
                                <span>{session.date} - {session.type}</span>
                                <button className="ml-2 bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No hay sesiones programadas.</p>
                )}
            </section>

            <button className="mt-4 bg-[#B62682] text-white px-6 py-3 rounded-lg text-lg font-semibold">
                Solicitar Sesión
            </button>

            <footer className="absolute bottom-4 text-black text-sm font-semibold">
                emestudi © 2025
            </footer>
        </div >
    );
}

export default HomeCustomer;