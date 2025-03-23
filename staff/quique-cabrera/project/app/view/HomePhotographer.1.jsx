import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function HomePhotographer() {
    const [name, setName] = useState('');
    const [availability, setAvailability] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [photographerId, setPhotographerId] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem('name')?.replace(/\s*\(\d+\)$/, '');
        const token = localStorage.getItem('token');
        const storedPhotographerId = localStorage.getItem('photographerId');

        if (!storedName || !token) return navigate('/login');
        if (!storedPhotographerId) return alert("Error: No se encontró el ID del fotógrafo.");

        setName(storedName);
        setPhotographerId(storedPhotographerId);
        fetchAvailability();
        fetchSessions();
    }, [navigate, photographerId]);

    const fetchAvailability = () => {
        const token = localStorage.getItem('token');
        if (!token || !photographerId) return;

        fetch(`${import.meta.env.VITE_API_URL}/sessions/availability/${photographerId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setAvailability)
            .catch(console.error);
    };

    const fetchSessions = () => {
        const token = localStorage.getItem('token');
        if (!token || !photographerId) return;

        fetch(`${import.meta.env.VITE_API_URL}/sessions/my-sessions`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(setSessions)
            .catch(console.error);
    };

    const handleSaveAvailability = () => {
        if (!selectedDate || !startTime || !endTime) return alert('Debes seleccionar una fecha y horas.');
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch(`${import.meta.env.VITE_API_URL}/sessions/availability`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                photographer: photographerId,
                date: selectedDate.toISOString().split("T")[0],
                startTime,
                endTime,
                available: true
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response.error) alert(response.error);
                else {
                    setSelectedDate(null);
                    setStartTime('');
                    setEndTime('');
                    fetchAvailability();
                }
            })
            .catch(console.error);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split("T")[0];
        setSelectedAvailability(availability.filter(slot => slot.date.startsWith(formattedDate)));
    };

    const tileClassName = ({ date, view }) =>
        view === 'month' && availability.some(slot => slot.date.startsWith(date.toISOString().split("T")[0]))
            ? 'text-black font-extrabold'
            : 'text-gray-400';

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col items-center p-4">
            <header className="w-full flex justify-center items-center p-4 bg-black rounded-lg text-white relative">
                <h1 className="text-xl font-bold">{name}</h1>
                <button onClick={() => navigate('/login')} className="bg-red-600 px-1 py-1 rounded absolute font-extrabold right-4">
                    <MdOutlineLogout />
                </button>
            </header>

            {!showCalendar ? (
                <>
                    <section className="w-full max-w-lg bg-white p-4 rounded-lg mt-4">
                        <h2 className="text-lg font-bold text-gray-700 text-center">Sesiones Programadas</h2>
                        {sessions.length ? (
                            <ul className="mt-2">
                                {sessions.map((session, index) => (
                                    <li key={index} className="p-2 border-b flex justify-between">
                                        <span>{new Date(session.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-center">No tienes sesiones programadas.</p>
                        )}
                    </section>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowCalendar(true)}>
                        Definir Disponibilidad
                    </button>
                </>
            ) : (
                <section className="w-full max-w-lg bg-[#E1F56E] p-4 rounded-lg mt-0">
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
                            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="border p-2 w-full" />
                            <label className="block text-gray-700 mt-2">Hora de fin:</label>
                            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="border p-2 w-full" />
                            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleSaveAvailability}>
                                Guardar
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