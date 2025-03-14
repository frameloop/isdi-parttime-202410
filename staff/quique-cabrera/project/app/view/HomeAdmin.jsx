import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";

function HomeAdmin() {
    const [name, setName] = useState('');
    const [photographers, setPhotographers] = useState([]);
    const [newPhotographer, setNewPhotographer] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        coverage_area: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        let storedName = localStorage.getItem('name');
        console.log('Nombre almacenado en localStorage:', storedName);

        if (!storedName) {
            console.log('No se encontró nombre, redirigiendo a /login');
            navigate('/login');
            return;
        }

        storedName = storedName.replace(/\s*\(\d+\)$/, '');
        setName(storedName);
        console.log('Nombre limpio establecido:', storedName);

        const token = localStorage.getItem('token');
        console.log('Token usado para la petición:', token);
        fetch(`${import.meta.env.VITE_API_URL}/admin/photographers`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                console.log('Fotógrafos obtenidos de la API:', data);
                setPhotographers(data);
            })
            .catch(error => console.error('Error obteniendo fotógrafos:', error));
    }, [navigate]);

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        console.log('Iniciando logout con token:', token);
        if (token) {
            fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            }).catch(error => console.error('Error en logout:', error));
        }
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        console.log('Token y nombre eliminados de localStorage');
        navigate('/login');
    };

    const handleAddPhotographer = (e) => {
        e.preventDefault();  // ✅ Evita que la página se recargue

        const token = localStorage.getItem('token');

        console.log('[DEBUG] Datos del nuevo fotógrafo a enviar:', newPhotographer);

        fetch(`${import.meta.env.VITE_API_URL}/admin/photographers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newPhotographer)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log('[handleAddPhotographer] ✅ Fotógrafo agregado:', data);
                setPhotographers([...photographers, data]);
                setNewPhotographer({ name: '', username: '', email: '', phone: '', password: '', coverage_area: '' });
            })
            .catch(error => console.error('[ERROR] ❌ Error agregando fotógrafo:', error.message));
    };

    const handleDeletePhotographer = (id) => {
        const token = localStorage.getItem('token');
        console.log('Eliminando fotógrafo con ID:', id);
        fetch(`${import.meta.env.VITE_API_URL}/admin/photographers/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(() => {
                console.log('Fotógrafo eliminado, actualizando lista');
                setPhotographers(photographers.filter(photo => photo._id !== id));
            })
            .catch(error => console.error('Error eliminando fotógrafo:', error));
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col items-center p-4">
            <header className="w-full flex justify-center items-center p-4 bg-black rounded-lg text-white relative">
                <h1 className="text-2xl font-bold">{name}</h1>
                <button onClick={handleLogout} className="bg-red-600 px-1 py-1 rounded absolute font-extrabold right-4">
                    <MdOutlineLogout />
                </button>
            </header>

            {/* ✅ CORREGIDO: Formulario envuelve los inputs */}
            <form className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4" onSubmit={handleAddPhotographer}>
                <h2 className="text-lg font-bold text-gray-700 text-center">Registrar Fotógrafo</h2>

                <input type="text" placeholder="Nombre" className="w-full p-2 border my-2"
                    value={newPhotographer.name}
                    onChange={(e) => setNewPhotographer({ ...newPhotographer, name: e.target.value })}
                />

                <input type="text" placeholder="Username" className="w-full p-2 border my-2"
                    value={newPhotographer.username}
                    onChange={(e) => setNewPhotographer({ ...newPhotographer, username: e.target.value })}
                />

                <input type="email" placeholder="Email" className="w-full p-2 border my-2"
                    value={newPhotographer.email}
                    onChange={(e) => setNewPhotographer({ ...newPhotographer, email: e.target.value })}
                />

                <input type="tel" placeholder="Teléfono" className="w-full p-2 border my-2"
                    value={newPhotographer.phone}
                    onChange={(e) => setNewPhotographer({ ...newPhotographer, phone: e.target.value })}
                />

                <input type="password" placeholder="Contraseña" className="w-full p-2 border my-2"
                    value={newPhotographer.password}
                    onChange={(e) => setNewPhotographer({ ...newPhotographer, password: e.target.value })}
                />

                <input type="text" placeholder="Área de Cobertura" className="w-full p-2 border my-2"
                    value={newPhotographer.coverage_area}
                    onChange={(e) => setNewPhotographer({ ...newPhotographer, coverage_area: e.target.value })}
                />

                <button type="submit" className="w-full bg-[#B62682] text-white p-2 rounded">
                    Registrar
                </button>
            </form>

            <section className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4">
                <h2 className="text-lg font-bold text-gray-700 text-center">Fotógrafos Registrados</h2>
                {photographers.length > 0 ? (
                    <ul>
                        {photographers.map((photographer, index) => (
                            <li key={photographer._id || index} className="p-2 border-b flex justify-between">
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
