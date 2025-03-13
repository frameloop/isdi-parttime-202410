import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function HomeCustomer() {
    const [name, setName] = useState('');
    const [sessions, setSessions] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const token = localStorage.getItem('token');

        if (!storedName || !token) {
            navigate('/login');
            return;
        }

        setName(storedName.replace(/\s*\(\d+\)$/, ''));
        fetchSessions();
        fetchAvailability();
    }, [navigate]);

    // 📌 Obtener sesiones programadas
    const fetchSessions = () => {
        const token = localStorage.getItem('token');
        const apiUrl = `${import.meta.env.VITE_API_URL}/sessions/customer`;

        fetch(apiUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                console.log("[fetchSessions] 📅 Sesiones obtenidas:", data);
                setSessions(data);
            })
            .catch(error => console.error('[ERROR] ❌ Fetching sessions:', error));
    };

    // 📌 Obtener disponibilidad de los fotógrafos
    const fetchAvailability = () => {
        const token = localStorage.getItem('token');
        const apiUrl = `${import.meta.env.VITE_API_URL}/sessions/availability`;

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

    // 📌 Manejo de selección de fecha
    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("[handleDateChange] 📅 Fecha seleccionada:", date);

        const selectedDateStr = date.toISOString().split("T")[0];
        const slots = availability.filter(slot => slot.date.startsWith(selectedDateStr));

        setAvailableSlots(slots);
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col items-center p-4">
            <header className="w-full flex justify-center items-center p-4 bg-black rounded-lg text-white relative">
                <h1 className="text-xl font-bold">{name}</h1>
                <button onClick={() => navigate('/login')} className="bg-red-600 px-1 py-1 rounded absolute font-extrabold right-4">
                    <MdOutlineLogout />
                </button>
            </header>

            <section className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4">
                <h2 className="text-lg font-bold text-gray-700 text-center">Sesiones Programadas</h2>
                {sessions.length > 0 ? (
                    <ul className="mt-2">
                        {sessions.map((session, index) => (
                            <li key={index} className="p-2 border-b flex justify-between">
                                <span>{new Date(session.date).toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center">No tienes sesiones programadas.</p>
                )}
            </section>

            {!showCalendar && (
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => setShowCalendar(true)}
                >
                    Solicitar Sesión
                </button>
            )}

            {showCalendar && (
                <section className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4">
                    <h2 className="text-lg font-bold text-gray-700 text-center">Seleccionar Disponibilidad</h2>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        className="mt-4 border border-gray-300"
                    />
                    <button
                        className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => setShowCalendar(false)}
                    >
                        Volver
                    </button>
                    {selectedDate && (
                        <div className="mt-4">
                            <h3 className="text-gray-700 font-semibold">Disponibilidad para {selectedDate.toLocaleDateString()}</h3>
                            {availableSlots.length > 0 ? (
                                <ul className="mt-2">
                                    {availableSlots.map((slot, index) => (
                                        <li key={index} className="p-2 border-b flex justify-between">
                                            <span>{slot.startTime} - {slot.endTime}</span>
                                            <button
                                                className="bg-green-500 text-white px-3 py-1 rounded"
                                            >
                                                Reservar
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">No hay disponibilidad para esta fecha.</p>
                            )}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}

export default HomeCustomer;
