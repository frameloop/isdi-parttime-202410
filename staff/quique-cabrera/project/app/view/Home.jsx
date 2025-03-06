import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let storedName = localStorage.getItem('name');

        if (!storedName) {
            navigate('/login'); // 🔹 Si no hay usuario, redirige
            return;
        }

        storedName = storedName.replace(/\s*\(\d+\)$/, ''); // 🔹 Elimina paréntesis y números
        setName(storedName);
    }, [navigate]);

    // ✅ Nueva versión mejorada del logout
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!res.ok) {
                    console.error('Logout API failed:', res.status);
                }
            }

            // 🔹 Eliminar credenciales del navegador
            localStorage.removeItem('token');
            localStorage.removeItem('name');

            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold text-black tracking-wider mb-6">Welcome, {name}!</h1>
            <p className="text-black">This is your home page after login.</p>

            {/* 🔹 Botón de Logout */}
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all"
            >
                Logout
            </button>

            <footer className="absolute bottom-4 text-black text-sm font-semibold">
                emestudi © 2025
            </footer>
        </div>
    );
}

export default Home;
