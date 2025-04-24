import React, { useState, useEffect } from 'react';
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import useCustomerData from '../hooks/useCustomerData';
import CalendarSelector from './components/CalendarSelector';
import SessionListCustomer from './components/SessionListCustomer';
import AvailableSlotsList from './components/AvailableSlotsList';
import ReservationForm from './components/ReservationForm';
import ConfirmationBox from './components/ConfirmationBox';
import PhotographerSelector from './components/PhotographerSelector';
import { usersApi } from '../logic';
import { useAppContext } from '../context';
import createPhotographersApi from '../logic/api/photographers';
import createSessionsApi from '../logic/api/sessions';

function HomeCustomer() {
    const API_URL = import.meta.env.VITE_API_URL;
    const photographersApi = createPhotographersApi(API_URL);
    const sessionsApi = createSessionsApi(API_URL);
    const { showConfirmation, showAlert } = useAppContext();

    const {
        name,
        sessions,
        fetchSessions,
        id: customerId
    } = useCustomerData();

    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [allAvailableSlots, setAllAvailableSlots] = useState([]);
    const [filteredSlots, setFilteredSlots] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [reservingSlot, setReservingSlot] = useState(null);
    const [confirmedSession, setConfirmedSession] = useState(null);
    const [selectedPhotographer, setSelectedPhotographer] = useState(null);
    const [photographers, setPhotographers] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        addressType: '',
        street: '',
        postalCode: '',
        city: '',
        province: '',
        services: []
    });

    useEffect(() => {
        const loadPhotographers = async () => {
            try {
                console.log('Intentando cargar fotógrafos...');
                const token = usersApi.getToken();
                if (!token) {
                    console.error('No se encontró el token de autenticación');
                    return;
                }

                const response = await photographersApi.getAll(token);
                console.log('Respuesta de fotógrafos:', response);

                if (response && Array.isArray(response)) {
                    setPhotographers(response);
                    console.log('Fotógrafos cargados:', response);
                    if (response.length === 0) {
                        setErrors(prev => ({ ...prev, photographers: 'No hay fotógrafos disponibles' }));
                    } else {
                        setErrors(prev => ({ ...prev, photographers: null }));
                    }
                } else {
                    console.error('Formato de respuesta inválido:', response);
                    setErrors(prev => ({ ...prev, photographers: 'Error en el formato de datos de fotógrafos' }));
                }
            } catch (err) {
                console.error('Error al cargar fotógrafos:', err);
                setErrors(prev => ({ ...prev, photographers: 'Error al cargar fotógrafos' }));
            }
        };

        if (showCalendar) {
            loadPhotographers();
        }
    }, [showCalendar]);

    const handlePhotographerSelect = async (photographerId) => {
        try {
            console.log('Seleccionando fotógrafo:', photographerId);
            setSelectedPhotographer(photographerId);
            setSelectedDate(null);
            setFilteredSlots([]);

            const token = usersApi.getToken();
            if (!token) {
                console.error('No se encontró el token de autenticación');
                return;
            }

            console.log('Obteniendo disponibilidad para fotógrafo:', photographerId);
            const availabilityData = await sessionsApi.getAvailability(token, photographerId);
            console.log('Disponibilidad obtenida:', availabilityData);

            if (Array.isArray(availabilityData)) {
                setAllAvailableSlots(availabilityData.filter(slot => slot.available));
                setErrors(prev => ({ ...prev, availability: null }));
            } else {
                console.error('Formato de disponibilidad inválido:', availabilityData);
                setErrors(prev => ({ ...prev, availability: 'Error en el formato de datos de disponibilidad' }));
            }
        } catch (error) {
            console.error('Error al obtener disponibilidad:', error);
            setErrors(prev => ({ ...prev, availability: 'Error al obtener disponibilidad' }));
        }
    };

    const handleDateChange = (date) => {
        console.log('Fecha seleccionada:', date);
        setSelectedDate(date);

        // Formatear la fecha seleccionada en el formato YYYY-MM-DD
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const selectedDateStr = `${year}-${month}-${day}`;

        console.log('Filtrando slots para fecha:', selectedDateStr);

        // Filtrar slots comparando directamente las fechas en formato string
        const filtered = allAvailableSlots.filter(slot => slot.date === selectedDateStr);

        console.log('Slots filtrados:', filtered);
        setFilteredSlots(filtered);
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

    const handleConfirm = async () => {
        if (!reservingSlot) return;

        try {
            const token = usersApi.getToken();
            if (!token) {
                setErrors({ general: 'No estás autenticado' });
                return;
            }

            // Validar campos requeridos
            if (!formData.addressType || !formData.street || !formData.postalCode ||
                !formData.city || !formData.province || !formData.services.length) {
                setErrors({ general: 'Por favor, completa todos los campos requeridos' });
                return;
            }

            const sessionData = {
                photographerId: reservingSlot.photographer.id,
                date: reservingSlot.date,
                startDate: reservingSlot.startDate,
                endDate: reservingSlot.endDate,
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

            console.log('Enviando datos de sesión:', sessionData);

            try {
                const data = await sessionsApi.createSession(token, sessionData);
                console.log('Sesión creada:', data);

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
                setErrors({});
            } catch (error) {
                console.error('Error en la respuesta del servidor:', error);
                setErrors({ general: error.message || 'Error al crear la sesión' });
            }
        } catch (error) {
            console.error('Error al crear sesión:', error);
            setErrors({ general: error.message || 'Error al crear la sesión' });
        }
    };

    const handleCancelSession = (sessionId) => {
        const token = usersApi.getToken();
        if (!token) return showAlert("No estás autenticado");

        showConfirmation("¿Estás seguro de que quieres cancelar esta sesión?", async (confirmed) => {
            if (confirmed) {
                try {
                    const response = await fetch(`${API_URL}/sessions/${sessionId}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (!response.ok) throw new Error('Error al cancelar la sesión');

                    await fetchSessions();
                    showAlert("Sesión cancelada correctamente");
                } catch (error) {
                    console.error('Error al cancelar la sesión:', error);
                    showAlert("No se pudo cancelar la sesión");
                }
            }
        });
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

                    {!selectedPhotographer ? (
                        <>
                            {errors.photographers && (
                                <div className="text-red-500 mb-4">
                                    {errors.photographers}
                                </div>
                            )}
                            <PhotographerSelector
                                photographers={photographers}
                                onSelect={handlePhotographerSelect}
                            />
                            <button
                                className="mt-4 bg-[#B62682] text-white px-4 py-2 rounded-lg w-full"
                                onClick={() => setShowCalendar(false)}
                            >
                                Volver
                            </button>
                        </>
                    ) : (
                        <>
                            {errors.availability && (
                                <div className="text-red-500 mb-4">
                                    {errors.availability}
                                </div>
                            )}
                            <CalendarSelector
                                selectedDate={selectedDate}
                                availability={filteredSlots}
                                onChange={handleDateChange}
                            />

                            <div className="flex justify-between mt-2">
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                    onClick={() => {
                                        setSelectedPhotographer(null);
                                        setSelectedDate(null);
                                        setFilteredSlots([]);
                                    }}
                                >
                                    Cambiar Fotógrafo
                                </button>
                                <button
                                    className="bg-[#B62682] text-white px-4 py-2 rounded-lg"
                                    onClick={() => setShowCalendar(false)}
                                >
                                    Volver
                                </button>
                            </div>

                            {selectedDate && (
                                <>
                                    <h3 className="text-gray-700 font-semibold mt-4">
                                        Disponibilidad para {selectedDate.toLocaleDateString()}
                                    </h3>
                                    <AvailableSlotsList slots={filteredSlots} onReserve={handleStartReservation} />
                                </>
                            )}
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
                                setFilteredSlots([]);
                                setSelectedPhotographer(null);
                            }}
                        />
                    )}
                </section>
            )}
        </div>
    );
}

export default HomeCustomer;