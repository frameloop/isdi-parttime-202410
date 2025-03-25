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
    const [reservingSlot, setReservingSlot] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ addressType: '', street: '', postalCode: '', city: '', province: '', services: [] });
    const [confirmedSession, setConfirmedSession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem('name')?.split('(')[0].trim();
        const token = localStorage.getItem('token');
        if (!storedName || !token) return navigate('/login');
        setName(storedName);
        fetchSessions();
        fetchAvailability();
    }, [navigate]);

    const fetchSessions = () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        fetch(`${import.meta.env.VITE_API_URL}/sessions/my-sessions`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(setSessions)
            .catch(console.error);
    };

    const fetchAvailability = () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        fetch(`${import.meta.env.VITE_API_URL}/sessions/availability`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(setAvailability)
            .catch(console.error);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const selectedDateStr = date.toISOString().split("T")[0];
        setAvailableSlots(availability.filter(slot => slot.date.startsWith(selectedDateStr)));
    };

    const handleStartReservation = (slot) => setReservingSlot(slot);

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleServiceChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            services: checked ? [...prev.services, value] : prev.services.filter(s => s !== value)
        }));
    };

    const handleConfirm = () => {
        const token = localStorage.getItem('token');
        const customerId = localStorage.getItem('userId');
        const newErrors = {};
        if (!formData.addressType) newErrors.addressType = true;
        if (!formData.street) newErrors.street = true;
        if (!formData.postalCode) newErrors.postalCode = true;
        if (!formData.city) newErrors.city = true;
        if (!formData.province) newErrors.province = true;
        if (!formData.services.length) newErrors.services = true;

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return alert('Por favor, completa todos los campos obligatorios.');
        if (!token || !customerId) return alert('Falta autenticación.');

        const [hour, minute] = reservingSlot.startTime.split(':');
        const sessionDateTime = new Date(reservingSlot.date);
        sessionDateTime.setHours(parseInt(hour), parseInt(minute), 0, 0);

        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                customerId,
                photographerId: reservingSlot.photographer._id,
                date: sessionDateTime.toISOString(),
                type: 'express',
                address: {
                    type: formData.addressType,
                    street: formData.street,
                    postalCode: formData.postalCode,
                    city: formData.city,
                    province: formData.province
                },
                services: formData.services
            })
        })
            .then(res => {
                if (!res.ok) throw new Error('Error al crear la sesión');
                return res.json();
            })
            .then(savedSession => {
                setConfirmedSession({
                    ...savedSession,
                    photographer: reservingSlot.photographer,
                    startTime: reservingSlot.startTime,
                    endTime: reservingSlot.endTime,
                    address: formData,
                    services: formData.services
                });
                setReservingSlot(null);
                fetchSessions();
                setFormData({ addressType: '', postalCode: '', city: '', province: '', services: [] });
            })
            .catch(() => alert('No se pudo crear la sesión.'))
            .finally(() => setIsLoading(false));
    };

    const handleCancelSession = (sessionId) => {
        const token = localStorage.getItem('token');
        if (!token) return alert("No estás autenticado");
        if (!confirm("¿Estás seguro de que quieres cancelar esta sesión?")) return;

        fetch(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error('Error al cancelar la sesión');
                return res.json();
            })
            .then(() => {
                alert("Sesión cancelada correctamente");
                fetchSessions();
            })
            .catch(() => alert("No se pudo cancelar la sesión"));
    };

    return (
        <div className="w-screen min-h-screen bg-[#E1F56E] flex flex-col items-center p-4">
            <header className="w-full flex justify-center items-center p-4 bg-black rounded-lg text-white relative">
                <h1 className="text-xl font-bold">{name}</h1>
                <button onClick={() => navigate('/login')} className="bg-red-600 px-1 py-1 rounded absolute font-extrabold right-4">
                    <MdOutlineLogout />
                </button>
            </header>
            <section className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4">
                <h2 className="text-lg font-bold text-gray-700 text-center">Sesiones Programadas</h2>
                {sessions.length ? (
                    <ul className="mt-2">
                        {sessions.map((session, index) => (
                            <li key={index} className="p-4 rounded mb-2 bg-white">
                                <p className="font-semibold text-Lm text-gray-800">{new Date(session.date).toLocaleString()}</p>
                                <p className="text-sm">{`${session.address?.type || ''} ${session.address?.street || ''}, ${session.address?.city || ''}, ${session.address?.postalCode || ''} (${session.address?.province || ''})`}</p>
                                <p className="text-sm">{session.services?.join(', ')}</p>
                                <p className="text-sm">
                                    {session.photographer?.user?.name || 'Desconocido'} - T. {session.photographer?.user?.phone || 'Desconocido'}
                                </p>
                                <button onClick={() => handleCancelSession(session._id)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                                    Cancelar sesión
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center">No tienes sesiones programadas.</p>
                )}
            </section>
            {!showCalendar ? (
                <button className="mt-4 bg-[#B62682] text-white px-4 py-2 rounded-lg" onClick={() => setShowCalendar(true)}>
                    Solicitar Sesión
                </button>
            ) : (
                <section className="w-full max-w-sg bg-white p-4 rounded-lg mt-4">
                    <h2 className="text-xl font-bold text-gray-700 text-center">Seleccionar Disponibilidad</h2>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        tileClassName={({ date, view }) =>
                            view === 'month' && availability.some(slot => slot.date.startsWith(date.toISOString().split("T")[0]))
                                ? 'bg-green-500 text-black font-bold rounded-full'
                                : 'text-gray-400'
                        }
                        className="mt-4 border border-gray-300"
                    />
                    <button className="mt-2 bg-[#B62682] text-white px-4 py-2 rounded-lg" onClick={() => setShowCalendar(false)}>
                        Volver
                    </button>
                    {selectedDate && (
                        <div className="mt-4">
                            <h3 className="text-gray-700 font-semibold">Disponibilidad para {selectedDate.toLocaleDateString()}</h3>
                            {availableSlots.length ? (
                                <ul className="mt-2">
                                    {availableSlots.map((slot, index) => (
                                        <li key={index} className="p-2 border-b flex flex-col sm:flex-row sm:justify-between gap-2">
                                            <div>
                                                <p className="font-medium">{slot.startTime} - {slot.endTime} - {slot.photographer?.coverage_area || 'Zona no especificada'}</p>
                                                <p className="text-sm text-gray-700">📸 {slot.photographer?.name || slot.photographer?.firstName || 'Nombre no disponible'}</p>
                                            </div>
                                            <button className="bg-green-500 text-white px-3 py-1 rounded self-start sm:self-center" onClick={() => handleStartReservation(slot)}>
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
                    {reservingSlot && (
                        <section className="bg-white p-4 mt-4 rounded shadow-md">
                            <h3 className="text-lg font-bold mb-2">Completa los detalles de la sesión</h3>
                            <p className="text-sm mb-4">📅 {reservingSlot.date} ⏰ {reservingSlot.startTime} - {reservingSlot.endTime}</p>
                            <select name="addressType" className="w-full border p-2 rounded mb-2" value={formData.addressType} onChange={handleInputChange}>
                                <option value="">tipo de vía</option>
                                <option value="Calle">Calle</option>
                                <option value="Avenida">Avenida</option>
                                <option value="Plaza">Plaza</option>
                                <option value="Camino">Camino</option>
                            </select>
                            <input name="street" type="text" placeholder="nombre de la calle y número" className={`w-full border p-2 rounded mb-2 ${errors.street ? 'border-red-500' : ''}`} value={formData.street} onChange={handleInputChange} />
                            <input name="postalCode" type="text" placeholder="código postal" className="w-full border p-2 rounded mb-2" value={formData.postalCode} onChange={handleInputChange} />
                            <input name="city" type="text" placeholder="ciudad" className="w-full border p-2 rounded mb-2" value={formData.city} onChange={handleInputChange} />
                            <input name="province" type="text" placeholder="provincia" className="w-full border p-2 rounded mb-4" value={formData.province} onChange={handleInputChange} />
                            <label className="block font-medium mb-1">Servicio</label>
                            <div className="mb-4">
                                {["Virtual Tour 3D", "Virtual Tour 360", "Video Express"].map(service => (
                                    <label key={service} className="block text-sm">
                                        <input type="checkbox" value={service} checked={formData.services.includes(service)} onChange={handleServiceChange} className="mr-2" />
                                        {service}
                                    </label>
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={() => setReservingSlot(null)}>atrás</button>
                                <button className="bg-purple-700 text-white px-4 py-2 rounded" onClick={handleConfirm}>confirmar</button>
                            </div>
                        </section>
                    )}
                    {confirmedSession && (
                        <section className="bg-white mt-6 p-4 rounded-xl shadow-md border border-green-400 w-full max-w-lg">
                            <h3 className="text-xl font-bold text-green-700 mb-2">✅ ¡Sesión Confirmada!</h3>
                            <p className="text-sm text-gray-600 mb-4">Aquí tienes los detalles:</p>
                            <ul className="text-sm text-gray-800 space-y-2">
                                <li><strong>📅 Fecha:</strong> {new Date(confirmedSession.date).toLocaleDateString()}</li>
                                <li><strong>⏰ Hora:</strong> {confirmedSession.startTime} - {confirmedSession.endTime}</li>
                                <li><strong>📸 Fotógrafo:</strong> {confirmedSession.photographer?.name || confirmedSession.photographer?.firstName || 'Nombre no disponible'}</li>
                                <li><strong>📍 Zona:</strong> {confirmedSession.photographer?.coverage_area || 'No especificada'}</li>
                                <li><strong>🏠 Dirección:</strong><br />{`${confirmedSession.address.addressType || ''} ${confirmedSession.address.street || ''}, ${confirmedSession.address.city}, ${confirmedSession.address.postalCode} (${confirmedSession.address.province})`}</li>
                                <li><strong>🎯 Servicios:</strong><ul className="list-disc ml-6">{confirmedSession.services.map((s, i) => <li key={i}>{s}</li>)}</ul></li>
                            </ul>
                            <button onClick={() => { setConfirmedSession(null); setShowCalendar(false); setSelectedDate(null); setAvailableSlots([]); }} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                                Volver a inicio
                            </button>
                        </section>
                    )}
                </section>
            )}
        </div>
    );
}

export default HomeCustomer;