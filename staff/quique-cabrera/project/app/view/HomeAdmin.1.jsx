import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";

function HomeAdmin() {
    const [name, setName] = useState('');
    const [photographers, setPhotographers] = useState([]);
    const [newPhotographer, setNewPhotographer] = useState({ name: '', username: '', email: '', phone: '', password: '', coverage_area: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem('name')?.replace(/\s*\(\d+\)$/, '');
        const token = localStorage.getItem('token');
        if (!storedName || !token) return navigate('/login');
        setName(storedName);
        fetch(`${import.meta.env.VITE_API_URL}/users/photographers`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(setPhotographers)
            .catch(console.error);
    }, [navigate]);

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${import.meta.env.VITE_API_URL}/users/logout`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
                .then(() => { localStorage.clear(); navigate('/login'); })
                .catch(() => { localStorage.clear(); navigate('/login'); });
        } else {
            localStorage.clear();
            navigate('/login');
        }
    };

    const handleAddPhotographer = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        fetch(`${import.meta.env.VITE_API_URL}/users/photographers`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(newPhotographer) })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(data => { setPhotographers([...photographers, data]); setNewPhotographer({ name: '', username: '', email: '', phone: '', password: '', coverage_area: '' }); })
            .catch(console.error);
    };

    const handleDeletePhotographer = (id) => {
        const token = localStorage.getItem('token');
        fetch(`${import.meta.env.VITE_API_URL}/users/photographers/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
            .then(() => setPhotographers(photographers.filter(photo => photo._id !== id)))
            .catch(console.error);
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col items-center p-4">
            <header className="w-full flex justify-center items-center p-4 bg-black rounded-lg text-white relative">
                <h1 className="text-2xl font-bold">{name}</h1>
                <button onClick={handleLogout} className="bg-red-600 px-1 py-1 rounded absolute font-extrabold right-4"><MdOutlineLogout /></button>
            </header>
            <form className="w-full max-w-lg bg-[#E1F56E] p-4 rounded-lg" onSubmit={handleAddPhotographer}>
                <h2 className="text-lg font-bold text-gray-700 text-center">Registrar Fotógrafo</h2>
                {['name', 'username', 'email', 'phone', 'password', 'coverage_area'].map(field => (
                    <input key={field} type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : field === 'password' ? 'password' : 'text'} placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} className="w-full p-2 border my-2" value={newPhotographer[field]} onChange={e => setNewPhotographer({ ...newPhotographer, [field]: e.target.value })} />
                ))}
                <button type="submit" className="w-full bg-[#B62682] text-white p-2 rounded mt-2">Registrar</button>
            </form>
            <section className="w-full max-w-lg bg-[#E1F56E] p-4 rounded-lg mt-0">
                <h2 className="text-lg font-bold text-gray-700 text-center">Fotógrafos Registrados</h2>
                {photographers.length ? (
                    <ul>
                        {photographers.map((photographer, index) => (
                            <li key={photographer._id || index} className="p-2 border-b font-bold flex justify-between">
                                <span>{photographer.user?.name || `Fotógrafo ${index + 1}`}</span>
                                <button onClick={() => handleDeletePhotographer(photographer._id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No hay fotógrafos registrados.</p>
                )}
            </section>
        </div>
    );
}

export default HomeAdmin;