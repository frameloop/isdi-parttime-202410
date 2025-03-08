import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";


function HomeAdmin() {
    const [name, setName] = useState('');
    const [photographers, setPhotographers] = useState([]);
    const [newPhotographer, setNewPhotographer] = useState({ name: '', username: '', email: '', coverage: '' });
    const navigate = useNavigate();

    useEffect(() => {
        let storedName = localStorage.getItem('name');

        if (!storedName) {
            navigate('/login');
            return;
        }

        storedName = storedName.replace(/\s*\(\d+\)$/, '');
        setName(storedName);

        // Obtener la lista de fotógrafos
        const token = localStorage.getItem('token');
        fetch(`${import.meta.env.VITE_API_URL}/admin/photographers`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setPhotographers(data))
            .catch(error => console.error('Error obteniendo fotógrafos:', error));
    }, [navigate]);

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            }).catch(error => console.error('Error en logout:', error));
        }
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/login');
    };

    const handleAddPhotographer = () => {
        const token = localStorage.getItem('token');
        fetch(`${import.meta.env.VITE_API_URL}/admin/photographers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(newPhotographer)
        })
            .then(res => res.json())
            .then(data => {
                setPhotographers([...photographers, data]);
                setNewPhotographer({ name: '', username: '', email: '', coverage: '' });
            })
            .catch(error => console.error('Error agregando fotógrafo:', error));
    };

    const handleDeletePhotographer = (id) => {
        const token = localStorage.getItem('token');
        fetch(`${import.meta.env.VITE_API_URL}/admin/photographers/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(() => {
                setPhotographers(photographers.filter(photo => photo.id !== id));
            })
            .catch(error => console.error('Error eliminando fotógrafo:', error));
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col items-center p-4">
            <header className="w-full flex justify-center items-center p-4 bg-black rounded-lg  text-white relative">
                <h1 className="text-2xl font-bold">{name}</h1>
                <button onClick={handleLogout} className="bg-red-600 px-1 py-1 rounded absolute font-extrabold right-4"><MdOutlineLogout /></button>
            </header>

            {/* Formulario para agregar fotógrafos */}
            <section className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4">
                <h2 className="text-lg font-bold text-gray-700 text-center">Registrar Fotógrafo</h2>
                <input type="text" placeholder="Nombre" className="w-full p-2 border my-2" value={newPhotographer.name} onChange={(e) => setNewPhotographer({ ...newPhotographer, name: e.target.value })} />
                <input type="text" placeholder="Username" className="w-full p-2 border my-2" value={newPhotographer.username} onChange={(e) => setNewPhotographer({ ...newPhotographer, username: e.target.value })} />
                <input type="email" placeholder="Email" className="w-full p-2 border my-2" value={newPhotographer.email} onChange={(e) => setNewPhotographer({ ...newPhotographer, email: e.target.value })} />
                <input type="text" placeholder="Área de Cobertura" className="w-full p-2 border my-2" value={newPhotographer.coverage} onChange={(e) => setNewPhotographer({ ...newPhotographer, coverage: e.target.value })} />
                <button onClick={handleAddPhotographer} className="w-full bg-[#B62682] text-white p-2 rounded">Registrar</button>
            </section>

            {/* Lista de fotógrafos */}
            <section className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4">
                <h2 className="text-lg font-bold text-gray-700 text-center">Fotógrafos Registrados</h2>
                {photographers.length > 0 ? (
                    <ul>
                        {photographers.map(photo => (
                            <li key={photo.id} className="p-2 border-b flex justify-between">
                                <span>{photo.name} ({photo.username})</span>
                                <button onClick={() => handleDeletePhotographer(photo.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No hay fotógrafos registrados.</p>
                )}
            </section>

            <footer className="absolute bottom-4 text-gray-700 text-sm font-semibold">
                emestudi © 2025
            </footer>
        </div>
    );
}

export default HomeAdmin;
