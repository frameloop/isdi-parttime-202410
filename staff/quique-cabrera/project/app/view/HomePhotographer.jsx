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
    const [editingSlotId, setEditingSlotId] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [photographerId, setPhotographerId] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [blockedTimes, setBlockedTimes] = useState([]);
    const [showStartTimeDropdown, setShowStartTimeDropdown] = useState(false);
    const [showEndTimeDropdown, setShowEndTimeDropdown] = useState(false);
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
            .then(data => {
                console.log("📅 Availability fetched:", data);
                setAvailability(data);
            })
            .catch(console.error);
    };

    const fetchSessions = () => {
        const token = localStorage.getItem('token');
        if (!token || !photographerId) return;

        fetch(`${import.meta.env.VITE_API_URL}/sessions/my-sessions`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(data => {
                console.log("📅 Sessions fetched:", data);
                setSessions(data);
            })
            .catch(console.error);
    };

    const handleSaveAvailability = () => {
        if (!selectedDate || !startTime || !endTime) return alert('Debes seleccionar una fecha y horas.');
        const token = localStorage.getItem('token');
        if (!token) return;

        const payload = {
            photographer: photographerId,
            date: selectedDate.toISOString().split("T")[0],
            startTime,
            endTime,
            available: true
        };

        const method = editingSlotId ? 'PUT' : 'POST';
        const url = editingSlotId
            ? `${import.meta.env.VITE_API_URL}/sessions/availability/${editingSlotId}`
            : `${import.meta.env.VITE_API_URL}/sessions/availability`;

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(response => {
                if (response.error) alert(response.error);
                else {
                    setSelectedDate(null);
                    setStartTime('');
                    setEndTime('');
                    setEditingSlotId(null);
                    fetchAvailability();
                    setShowCalendar(false);
                }
            })
            .catch(console.error);
    };

    const handleEditSlot = (slot) => {
        setSelectedDate(new Date(slot.date));
        setStartTime(slot.startTime);
        setEndTime(slot.endTime);
        setEditingSlotId(slot._id);
        setShowCalendar(true);
    };

    const handleDeleteSlot = (id) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        if (confirm("¿Seguro que quieres eliminar esta disponibilidad?")) {
            fetch(`${import.meta.env.VITE_API_URL}/sessions/availability/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(() => fetchAvailability())
                .catch(console.error);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split("T")[0];
        setSelectedAvailability(availability.filter(slot => {
            const slotDate = new Date(slot.date).toISOString().split("T")[0];
            return slotDate === formattedDate;
        }));

        const blocked = [];

        // Bloquear horas basadas en sesiones programadas
        sessions
            .filter(s => new Date(s.date).toISOString().split("T")[0] === formattedDate)
            .forEach(session => {
                const sessionStart = new Date(session.date);
                const sessionEnd = new Date(sessionStart.getTime() + 60 * 60 * 1000); // asumiendo 1h

                for (
                    let t = new Date(sessionStart);
                    t < sessionEnd;
                    t.setMinutes(t.getMinutes() + 30)
                ) {
                    const hours = t.getHours().toString().padStart(2, '0');
                    const minutes = t.getMinutes().toString().padStart(2, '0');
                    blocked.push(`${hours}:${minutes}`);
                }
            });

        // Bloquear horas basadas en disponibilidades existentes
        availability
            .filter(a => {
                const slotDate = new Date(a.date).toISOString().split("T")[0];
                return slotDate === formattedDate;
            })
            .forEach(slot => {
                const start = new Date(`2025-01-01T${slot.startTime}:00`);
                const end = new Date(`2025-01-01T${slot.endTime}:00`);

                for (
                    let t = new Date(start);
                    t <= end; // Incluimos la hora final
                    t.setMinutes(t.getMinutes() + 30)
                ) {
                    const hours = t.getHours().toString().padStart(2, '0');
                    const minutes = t.getMinutes().toString().padStart(2, '0');
                    if (!blocked.includes(`${hours}:${minutes}`)) {
                        blocked.push(`${hours}:${minutes}`);
                    }
                }
            });

        console.log(`🛑 Blocked times for ${formattedDate}:`, blocked);
        setBlockedTimes(blocked);
    };

    const tileClassName = ({ date, view }) =>
        view === 'month' && availability.some(slot => {
            const slotDate = new Date(slot.date).toISOString().split("T")[0];
            return slotDate === date.toISOString().split("T")[0];
        })
            ? 'text-black font-extrabold'
            : 'text-gray-400';

    const groupedAvailability = availability.reduce((acc, slot) => {
        const date = new Date(slot.date).toLocaleDateString();
        acc[date] = acc[date] || [];
        acc[date].push(slot);
        return acc;
    }, {});

    const generateTimeOptions = () => {
        const options = [];
        for (let h = 9; h < 18; h++) {
            options.push(`${h.toString().padStart(2, '0')}:00`);
            options.push(`${h.toString().padStart(2, '0')}:30`);
        }
        options.push("18:00");
        return options;
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col items-center p-4 overflow-y-auto">
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

                    <section className="w-full max-w-lg bg-white p-4 rounded-lg mt-4">
                        <h2 className="text-lg font-bold text-gray-700 text-center">Disponibilidad Actual</h2>
                        {Object.keys(groupedAvailability).length ? (
                            Object.entries(groupedAvailability).map(([date, slots]) => (
                                <div key={date} className="mb-4">
                                    <h3 className="text-md font-semibold text-gray-800 mb-1">{date}</h3>
                                    <ul>
                                        {slots.map(slot => (
                                            <li key={slot._id} className="flex justify-between items-center text-sm border-b py-1">
                                                <span>{slot.startTime} - {slot.endTime}</span>
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleEditSlot(slot)} className="text-blue-500 font-bold">🖊</button>
                                                    <button onClick={() => handleDeleteSlot(slot._id)} className="text-red-500 font-bold">❌</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center">No tienes horas disponibles aún.</p>
                        )}
                    </section>

                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowCalendar(true)}>
                        Definir Disponibilidad
                    </button>
                </>
            ) : (
                <section className="w-full max-w-lg bg-[#E1F56E] p-4 rounded-lg mt-0">
                    <h2 className="text-lg font-bold text-gray-700 text-center">
                        {editingSlotId ? 'Editar Disponibilidad' : 'Agregar Disponibilidad'}
                    </h2>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        className="mt-4 border border-gray-300"
                        tileClassName={tileClassName}
                    />
                    {selectedDate && (
                        <>
                            <p className="text-gray-700 font-semibold mt-2">Fecha seleccionada: {selectedDate.toLocaleDateString()}</p>

                            {/* Dropdown para Hora de Inicio */}
                            <label className="block text-gray-700 mt-2">Hora de inicio:</label>
                            <div className="relative">
                                <button
                                    className="border p-2 w-full rounded bg-white text-left text-gray-700"
                                    onClick={() => setShowStartTimeDropdown(!showStartTimeDropdown)}
                                >
                                    {startTime || "-- Selecciona hora de inicio --"}
                                </button>
                                {showStartTimeDropdown && (
                                    <ul className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto shadow-lg">
                                        {generateTimeOptions().map(time => (
                                            <li
                                                key={time}
                                                className={`p-2 cursor-pointer ${blockedTimes.includes(time)
                                                    ? "text-red-500 opacity-50 cursor-not-allowed"
                                                    : "text-green-600 hover:bg-gray-100"
                                                    }`}
                                                onClick={() => {
                                                    if (!blockedTimes.includes(time)) {
                                                        setStartTime(time);
                                                        setShowStartTimeDropdown(false);
                                                    }
                                                }}
                                            >
                                                {blockedTimes.includes(time) ? `🟥 ${time} (Ocupado)` : `🟩 ${time}`}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Dropdown para Hora de Fin */}
                            <label className="block text-gray-700 mt-2">Hora de fin:</label>
                            <div className="relative">
                                <button
                                    className="border p-2 w-full rounded bg-white text-left text-gray-700"
                                    onClick={() => setShowEndTimeDropdown(!showEndTimeDropdown)}
                                >
                                    {endTime || "-- Selecciona hora de fin --"}
                                </button>
                                {showEndTimeDropdown && (
                                    <ul className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto shadow-lg">
                                        {generateTimeOptions().map(time => (
                                            <li
                                                key={time}
                                                className={`p-2 cursor-pointer ${blockedTimes.includes(time)
                                                    ? "text-red-500 opacity-50 cursor-not-allowed"
                                                    : "text-green-600 hover:bg-gray-100"
                                                    }`}
                                                onClick={() => {
                                                    if (!blockedTimes.includes(time)) {
                                                        setEndTime(time);
                                                        setShowEndTimeDropdown(false);
                                                    }
                                                }}
                                            >
                                                {blockedTimes.includes(time) ? `🟥 ${time} (Ocupado)` : `🟩 ${time}`}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleSaveAvailability}>
                                {editingSlotId ? 'Actualizar' : 'Guardar'}
                            </button>
                        </>
                    )}

                    <button className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => {
                        setShowCalendar(false);
                        setEditingSlotId(null);
                        setStartTime('');
                        setEndTime('');
                        setSelectedDate(null);
                        setShowStartTimeDropdown(false);
                        setShowEndTimeDropdown(false);
                    }}>
                        Volver
                    </button>
                </section>
            )}
        </div>
    );
}

export default HomePhotographer;