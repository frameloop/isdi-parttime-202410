import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function HomePhotographer() {
    // Estados para manejar datos del componente
    const [name, setName] = useState(''); // Nombre del fotógrafo
    const [availability, setAvailability] = useState([]); // Lista de disponibilidades
    const [sessions, setSessions] = useState([]); // Lista de sesiones programadas
    const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada en el calendario
    const [startTime, setStartTime] = useState(''); // Hora de inicio de disponibilidad
    const [endTime, setEndTime] = useState(''); // Hora de fin de disponibilidad
    const [showCalendar, setShowCalendar] = useState(false); // Mostrar u ocultar calendario
    const [photographerId, setPhotographerId] = useState(''); // ID del fotógrafo
    const [selectedAvailability, setSelectedAvailability] = useState([]); // Disponibilidad del día seleccionado
    const navigate = useNavigate(); // Hook para navegación

    // 📌 Obtener datos del usuario al cargar el componente
    useEffect(() => {
        console.log("[useEffect inicial] 🚀 Iniciando carga de datos del usuario");

        let storedName = localStorage.getItem('name');
        let storedPhotographerId = localStorage.getItem('photographerId');

        if (!storedName) {
            console.log("[useEffect inicial] ⚠️ No hay nombre en localStorage, redirigiendo a login");
            navigate('/login');
            return;
        }

        storedName = storedName.replace(/\s*\(\d+\)$/, '');
        setName(storedName);
        console.log("[useEffect inicial] 👤 Nombre procesado:", storedName);

        const token = localStorage.getItem('token');
        if (!token) {
            console.log("[useEffect inicial] ⚠️ No hay token, redirigiendo a login");
            navigate('/login');
            return;
        }

        if (!storedPhotographerId) {
            console.log("[useEffect inicial] ⚠️ No se encontró ID de fotógrafo en localStorage");
            alert("Error: No se encontró el ID del fotógrafo.");
            return;
        }

        setPhotographerId(storedPhotographerId);
        console.log("[useEffect inicial] 📸 ID del fotógrafo cargado:", storedPhotographerId);

        fetchAvailability();
    }, [navigate]);


    // useEffect(() => {
    //     console.log("[useEffect inicial] 🚀 Iniciando carga de datos del usuario");
    //     let storedName = localStorage.getItem('name');
    //     let storedPhotographerId = localStorage.getItem('photographerId');  // 👈 Obtener ID de fotógrafo
    //     let token = localStorage.getItem('token');

    //     if (!storedName || !storedPhotographerId || !token) {
    //         console.log("[useEffect inicial] ⚠️ No hay nombre, ID de fotógrafo o token, redirigiendo a login");
    //         navigate('/login');
    //         return;
    //     }

    //     storedName = storedName.replace(/\s*\(\d+\)$/, '');
    //     setName(storedName);
    //     setPhotographerId(storedPhotographerId);  // 👈 Guardar ID en el estado
    //     console.log("[useEffect inicial] 👤 Nombre procesado:", storedName);
    //     console.log("[useEffect inicial] 📸 ID del fotógrafo:", storedPhotographerId);

    //     fetchAvailability();
    // }, [navigate]);

    //OK
    // useEffect(() => {
    //     console.log("[useEffect inicial] 🚀 Iniciando carga de datos del usuario");
    //     let storedName = localStorage.getItem('name');
    //     if (!storedName) {
    //         console.log("[useEffect inicial] ⚠️ No hay nombre en localStorage, redirigiendo a login");
    //         navigate('/login');
    //         return;
    //     }

    //     storedName = storedName.replace(/\s*\(\d+\)$/, '');
    //     setName(storedName);
    //     console.log("[useEffect inicial] 👤 Nombre procesado:", storedName);

    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         console.log("[useEffect inicial] ⚠️ No hay token, redirigiendo a login");
    //         navigate('/login');
    //         return;
    //     }

    //     fetchAvailability();
    // }, [navigate]);

    // 📌 Obtener disponibilidad y sesiones cuando `photographerId` esté disponible
    useEffect(() => {
        if (photographerId) {
            console.log("[useEffect photographerId] 🔄 photographerId disponible:", photographerId);
            fetchAvailability();
            fetchSessions();
        }
    }, [photographerId]);

    // 📌 Obtener disponibilidad del fotógrafo
    const fetchAvailability = () => {
        const token = localStorage.getItem('token');
        if (!token || !photographerId) {
            console.log("[fetchAvailability] ⚠️ Falta token o photographerId");
            return;
        }

        const apiUrl = `${import.meta.env.VITE_API_URL}/sessions/availability/${photographerId}`;

        fetch(apiUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                console.log("[fetchAvailability] 📅 Disponibilidad obtenida:", data);
                setAvailability(data);
            })
            .catch(error => console.error('[ERROR] ❌ Fetching availability:', error));
    };

    // 📌 Obtener sesiones programadas
    const fetchSessions = () => {
        const token = localStorage.getItem('token');
        if (!token || !photographerId) {
            console.log("[fetchSessions] ⚠️ Falta token o photographerId");
            return;
        }

        const apiUrl = `${import.meta.env.VITE_API_URL}/sessions/photographer/${photographerId}`; // 🔹 Asegurar que la URL es correcta

        fetch(apiUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("[fetchSessions] 🎥 Sesiones programadas obtenidas:", data);
                setSessions(data);
            })
            .catch(error => {
                console.error('[ERROR] ❌ Fetching sessions:', error.message);
            });
    };


    // 📌 Guardar nueva disponibilidad
    const handleSaveAvailability = () => {
        if (!selectedDate || !startTime || !endTime) {
            console.log("[handleSaveAvailability] ⚠️ Faltan datos:", { selectedDate, startTime, endTime });
            alert('Debes seleccionar una fecha y horas antes de guardar.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.log("[handleSaveAvailability] ⚠️ Falta el token de autenticación.");
            return;
        }

        // ⚠️ Si no hay photographerId, lo obtenemos de localStorage como fallback
        let finalPhotographerId = photographerId || localStorage.getItem('photographerId');

        if (!finalPhotographerId) {
            console.log("[handleSaveAvailability] ❌ No se encontró el ID del fotógrafo.");
            alert("Error: No se encontró el ID del fotógrafo.");
            return;
        }

        const apiUrl = `${import.meta.env.VITE_API_URL}/sessions/availability`;
        const formattedDate = selectedDate.toISOString().split("T")[0];

        console.log("[handleSaveAvailability] 📤 Enviando datos:", {
            photographer: finalPhotographerId,
            date: formattedDate,
            startTime,
            endTime
        });

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                photographer: finalPhotographerId,  // 👈 Asegurar que el ID del fotógrafo está presente
                date: formattedDate,
                startTime,
                endTime,
                available: true
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response.error) {
                    console.log("[handleSaveAvailability] ❌ Error en respuesta:", response.error);
                    alert(response.error);
                } else {
                    console.log("[handleSaveAvailability] ✅ Disponibilidad guardada:", response);
                    setSelectedDate(null);
                    setStartTime('');
                    setEndTime('');
                    fetchAvailability();
                }
            })
            .catch(error => console.error('[ERROR] ❌ Saving availability:', error));
    };


    // 📌 Manejar selección de fecha en el calendario
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split("T")[0];
        console.log("[handleDateChange] 📅 Fecha seleccionada:", formattedDate);

        // Filtrar disponibilidad para ese día
        const availabilityForDay = availability.filter(slot => slot.date.startsWith(formattedDate));
        setSelectedAvailability(availabilityForDay);
        console.log("[handleDateChange] 📋 Disponibilidad para el día:", availabilityForDay);
    };

    // 📌 Estilos del calendario para resaltar los días con disponibilidad
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = date.toISOString().split("T")[0];
            const isAvailable = availability.some(slot => slot.date.startsWith(formattedDate));

            if (isAvailable) {
                return 'bg-green-500 text-white font-bold rounded-full';
            }
        }
        return null;
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col items-center p-4">
            <header className="w-full flex justify-center items-center p-4 bg-black rounded-lg text-white relative">
                <h1 className="text-xl font-bold">{name}</h1>
                <button onClick={() => navigate('/login')} className="bg-red-600 px-1 py-1 rounded absolute font-extrabold right-4">
                    <MdOutlineLogout />
                </button>
            </header>

            {!showCalendar && (
                <>
                    <section className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4">
                        <h2 className="text-lg font-bold text-gray-700 text-center">Sesiones Programadas</h2>
                        {sessions.length > 0 ? (
                            <ul className="mt-2">
                                {sessions.map((session, index) => (
                                    <li key={index} className="p-2 border-b flex justify-between">
                                        <span>
                                            {new Date(session.date).toLocaleDateString()} - {new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-center">No tienes sesiones programadas.</p>
                        )}
                    </section>

                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => setShowCalendar(true)}
                    >
                        Definir Disponibilidad
                    </button>
                </>
            )}

            {showCalendar && (
                <section className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4">
                    <h2 className="text-lg font-bold text-gray-700 text-center">Agregar Disponibilidad</h2>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        className="mt-4 border border-gray-300"
                        tileClassName={tileClassName}
                    />
                    {selectedDate && (
                        <>
                            <p className="text-gray-700 font-semibold">Fecha seleccionada: {selectedDate.toLocaleDateString()}</p>
                            <label className="block text-gray-700">Hora de inicio:</label>
                            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="border p-2 w-full" />
                            <label className="block text-gray-700 mt-2">Hora de fin:</label>
                            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="border p-2 w-full" />
                            <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleSaveAvailability}>
                                Guardar Disponibilidad
                            </button>
                        </>
                    )}

                    <button className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowCalendar(false)}>
                        Volver
                    </button>
                </section>
            )}
        </div>
    );
}

export default HomePhotographer;