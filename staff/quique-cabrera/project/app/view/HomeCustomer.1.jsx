import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import es from 'date-fns/locale/es';

const locales = { 'es': es };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

function HomeCustomer() {
    const [name, setName] = useState('');
    const [sessions, setSessions] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null); // 📅 Nueva variable para la fecha seleccionada
    const navigate = useNavigate();

    useEffect(() => {
        let storedName = localStorage.getItem('name');
        if (!storedName) {
            console.log('[HomeCustomer] No name found in localStorage, redirecting to login.');
            navigate('/login');
            return;
        }

        storedName = storedName.replace(/\s*\(\d+\)$/, '');
        setName(storedName);

        const token = localStorage.getItem('token');
        console.log('[HomeCustomer] Token enviado:', token);
        if (!token) {
            console.log('[HomeCustomer] No token found, redirecting to login.');
            navigate('/login');
            return;
        }

        const apiUrl = `${import.meta.env.VITE_API_URL}/sessions/customers/sessions`;
        console.log(`[HomeCustomer] Fetching sessions from: ${apiUrl}`);

        fetch(apiUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                console.log(`[HomeCustomer] API response status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                console.log('[HomeCustomer] Sessions received:', data);
                setSessions(data);
            })
            .catch(error => console.error('[HomeCustomer] Error fetching sessions:', error));
    }, [navigate]);

    // 📌 Función para seleccionar una fecha en el calendario
    const handleSelectSlot = ({ start }) => {
        setSelectedDate(start);
        console.log(`[HomeCustomer] Date selected: ${start}`);
    };

    // 📌 Función para solicitar una sesión
    const handleRequestSession = () => {
        if (!selectedDate) {
            alert('Por favor selecciona una fecha.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.log('[HomeCustomer] No token found, redirecting to login.');
            navigate('/login');
            return;
        }

        const apiUrl = `${import.meta.env.VITE_API_URL}/sessions`;
        console.log(`[HomeCustomer] Requesting session on: ${selectedDate}`);

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                date: selectedDate
            })
        })
            .then(res => {
                if (!res.ok) throw new Error(`API responded with status ${res.status}`);
                return res.json();
            })
            .then(data => {
                console.log('[HomeCustomer] Session requested successfully:', data);
                alert('Sesión solicitada correctamente.');
                setShowCalendar(false); // Oculta el calendario tras solicitar sesión
                setSelectedDate(null); // Reinicia la selección
                setSessions(prev => [...prev, data]); // Agrega la nueva sesión al estado
            })
            .catch(error => console.error('[HomeCustomer] Error requesting session:', error));
    };

    const events = sessions.map(session => ({
        title: session.type || 'Sesión Programada',
        start: new Date(session.date),
        end: new Date(session.date)
    }));

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col items-center p-4">
            <header className="w-full flex justify-center items-center p-4 bg-black rounded-lg text-white relative">
                <h1 className="text-xl font-bold">{name}</h1>
                <button onClick={() => navigate('/login')} className="bg-red-600 px-1 py-1 rounded absolute font-extrabold right-4"><MdOutlineLogout /></button>
            </header>

            <section className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4">
                <h2 className="text-lg font-bold text-gray-700 text-center">Sesiones Programadas</h2>
                {showCalendar ? (
                    <>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 400 }}
                            selectable
                            onSelectSlot={handleSelectSlot}
                        />
                        {selectedDate && (
                            <p className="text-gray-700 text-center mt-2">
                                Fecha seleccionada: {selectedDate.toLocaleDateString()}
                            </p>
                        )}
                        <button
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                            onClick={handleRequestSession}
                        >
                            Confirmar Sesión
                        </button>
                    </>
                ) : (
                    <ul>
                        {sessions.length > 0 ? (
                            sessions.map((session, index) => (
                                <li key={session.id || index} className="p-2 border-b">
                                    <span>{session.date} - {session.type || 'Sesión'}</span>
                                    <button className="ml-2 bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No hay sesiones programadas.</p>
                        )}
                    </ul>
                )}
            </section>

            <button
                className="mt-4 bg-[#B62682] text-white px-6 py-3 rounded-lg text-lg font-semibold"
                onClick={() => setShowCalendar(!showCalendar)}
            >
                {showCalendar ? 'Volver' : 'Solicitar Sesión'}
            </button>

            <footer className="absolute bottom-4 text-black text-sm font-semibold">
                emestudi © 2025
            </footer>
        </div>
    );
}

export default HomeCustomer;
