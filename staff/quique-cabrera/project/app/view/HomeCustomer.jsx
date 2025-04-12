import React, { useState } from 'react';
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import useCustomerData from '../hooks/useCustomerData';
import CalendarSelector from '../components/CalendarSelector';
import SessionListCustomer from '../components/SessionListCustomer';
import AvailableSlotsList from '../components/AvailableSlotsList';
import ReservationForm from '../components/ReservationForm';
import ConfirmationBox from '../components/ConfirmationBox';

function HomeCustomer() {
    const {
        name,
        sessions,
        availability,
        fetchSessions
    } = useCustomerData();

    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [reservingSlot, setReservingSlot] = useState(null);
    const [confirmedSession, setConfirmedSession] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        addressType: '',
        street: '',
        postalCode: '',
        city: '',
        province: '',
        services: []
    });

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const selectedDateStr = date.toISOString().split("T")[0];
        setAvailableSlots(availability.filter(slot => slot.date.startsWith(selectedDateStr)));
    };

    const handleStartReservation = (slot) => setReservingSlot(slot);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleServiceChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            services: checked ? [...prev.services, value] : prev.services.filter(s => s !== value)
        }));
    };

    const handleConfirm = () => {
        if (!reservingSlot) return;
        const token = localStorage.getItem('token');
        if (!token) return;

        const startDateTime = new Date(reservingSlot.startDate);

        const sessionData = {
            photographerId: reservingSlot.photographer._id,
            date: startDateTime.toISOString(),
            type: 'standard',
            address: {
                type: formData.addressType,
                street: formData.street,
                postalCode: formData.postalCode,
                city: formData.city,
                province: formData.province
            },
            services: formData.services
        };

        fetch(`${import.meta.env.VITE_API_URL}/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(sessionData)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(data => {
                        throw new Error(data.error || 'Error desconocido');
                    });
                }
                return res.json();
            })
            .then(data => {
                setConfirmedSession(data);
                fetchSessions();
                setFormData({
                    addressType: '',
                    street: '',
                    postalCode: '',
                    city: '',
                    province: '',
                    services: []
                });
                setReservingSlot(null);
            })
            .catch(error => {
                setErrors({ general: error.message });
            });
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
                <SessionListCustomer sessions={sessions} onCancel={handleCancelSession} />
            </section>

            {!showCalendar ? (
                <button className="mt-4 bg-[#B62682] text-white px-4 py-2 rounded-lg" onClick={() => setShowCalendar(true)}>
                    Solicitar Sesión
                </button>
            ) : (
                <section className="w-full max-w-lg bg-white p-4 rounded-lg mt-4">
                    <h2 className="text-xl font-bold text-gray-700 text-center">Seleccionar Disponibilidad</h2>

                    <CalendarSelector
                        selectedDate={selectedDate}
                        availability={availability}
                        onChange={handleDateChange}
                    />

                    <button className="mt-2 bg-[#B62682] text-white px-4 py-2 rounded-lg" onClick={() => setShowCalendar(false)}>
                        Volver
                    </button>

                    {selectedDate && (
                        <>
                            <h3 className="text-gray-700 font-semibold mt-4">
                                Disponibilidad para {selectedDate.toLocaleDateString()}
                            </h3>
                            <AvailableSlotsList slots={availableSlots} onReserve={handleStartReservation} />
                        </>
                    )}

                    {reservingSlot && (
                        <ReservationForm
                            slot={reservingSlot}
                            formData={formData}
                            errors={errors}
                            onChange={handleInputChange}
                            onServiceChange={handleServiceChange}
                            onCancel={() => setReservingSlot(null)}
                            onConfirm={handleConfirm}
                        />
                    )}

                    {confirmedSession && (
                        <ConfirmationBox
                            session={confirmedSession}
                            onClose={() => {
                                setConfirmedSession(null);
                                setShowCalendar(false);
                                setSelectedDate(null);
                                setAvailableSlots([]);
                            }}
                        />
                    )}
                </section>
            )}
        </div>
    );
}

export default HomeCustomer;