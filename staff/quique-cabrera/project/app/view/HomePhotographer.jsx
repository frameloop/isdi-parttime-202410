import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import usePhotographerData from '../hooks/usePhotographerData';
import AvailabilityList from './components/AvailabilityList';
import SessionList from './components/SessionList';
import AvailabilityForm from './components/AvailabilityForm';
import { formatDate, formatTime } from '../util/dateFormatters';
import { getBlockedTimesForDate } from '../util/availabilityUtils';
import { usersApi } from '../logic';
import createPhotographersApi from '../logic/api/photographers';
import { useAppContext } from '../context';

function HomePhotographer() {
    const API_URL = import.meta.env.VITE_API_URL;
    const photographersApi = createPhotographersApi(API_URL);

    const {
        name,
        photographerId,
        availability,
        sessions,
        fetchAvailability
    } = usePhotographerData();

    const navigate = useNavigate();
    const { showConfirmation } = useAppContext();

    const [form, setForm] = useState({
        selectedDate: null,
        startDate: '',
        endDate: '',
        editingSlotId: null
    });

    const [ui, setUi] = useState({
        showCalendar: false,
        showStartDropdown: false,
        showEndDropdown: false,
        blockedTimes: [],
        blockedDates: [],
        selectedAvailability: []
    });

    const groupedAvailability = useMemo(() => {
        return availability.reduce((acc, slot) => {
            const dateKey = slot.date;
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push({
                ...slot,
                formattedStartTime: formatTime(slot.startDate),
                formattedEndTime: formatTime(slot.endDate)
            });
            return acc;
        }, {});
    }, [availability]);

    const handleDateChange = (date) => {
        // Formatear la fecha de manera consistente
        const formattedDate = getFormattedDate(date);

        const slots = availability.filter(slot => {
            const slotDate = new Date(slot.date);
            return getFormattedDate(slotDate) === formattedDate;
        });

        const blocked = getBlockedTimesForDate(date, sessions, availability);

        setForm(prev => ({ ...prev, selectedDate: date }));
        setUi(prev => ({ ...prev, blockedTimes: blocked, selectedAvailability: slots }));
    };

    // Función auxiliar para formatear fechas de manera consistente
    const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getBlockedDates = () => {
        const allDates = new Set();
        const blockedDates = [];

        const today = new Date();
        const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

        for (let d = new Date(today); d <= endOfNextMonth; d.setDate(d.getDate() + 1)) {
            // Usar formato consistente para las fechas
            allDates.add(getFormattedDate(d));
        }

        allDates.forEach(dateStr => {
            // Crear la fecha a partir del string formateado
            const [year, month, day] = dateStr.split('-').map(Number);
            const date = new Date(year, month - 1, day);

            const blockedTimes = getBlockedTimesForDate(date, sessions, availability);

            if (blockedTimes.length >= 18) {
                blockedDates.push(dateStr);
            }
        });

        return blockedDates;
    };

    React.useEffect(() => {
        const blockedDates = getBlockedDates();
        setUi(prev => ({ ...prev, blockedDates }));
    }, [availability, sessions]);

    const handleSaveAvailability = async () => {
        const { selectedDate, startDate, endDate } = form;
        console.log('Iniciando creación de disponibilidad con:', { selectedDate, startDate, endDate, photographerId });

        // Validación más detallada
        const missingFields = [];
        if (!selectedDate) missingFields.push('fecha');
        if (!startDate) missingFields.push('hora de inicio');
        if (!endDate) missingFields.push('hora de fin');
        if (!photographerId) missingFields.push('ID del fotógrafo');

        if (missingFields.length > 0) {
            console.error('Campos faltantes:', missingFields);
            alert(`Por favor, completa los siguientes campos: ${missingFields.join(', ')}`);
            return;
        }

        // Corregir formato de fecha para evitar desfase por zona horaria
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        const startDateTime = new Date(`${dateStr}T${startDate}`);
        const endDateTime = new Date(`${dateStr}T${endDate}`);
        console.log('Fechas procesadas:', { dateStr, startDateTime, endDateTime });

        // Validación adicional de fechas
        if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
            console.error('Error en formato de fechas:', { startDateTime, endDateTime });
            alert('Error en el formato de las fechas');
            return;
        }

        if (startDateTime >= endDateTime) {
            console.error('Error en rango de fechas:', { startDateTime, endDateTime });
            alert('La hora de inicio debe ser anterior a la hora de fin');
            return;
        }

        const payload = {
            photographerId: photographerId,
            date: dateStr,
            startDate: startDateTime.toISOString(),
            endDate: endDateTime.toISOString(),
            available: true
        };
        console.log('Enviando payload:', payload);

        try {
            const token = usersApi.getToken();
            if (!token) {
                console.error('No se encontró el token');
                alert('Error de autenticación');
                return;
            }
            console.log('Token obtenido:', token ? 'Presente' : 'Ausente');

            const response = await photographersApi.createAvailability(token, payload);
            console.log('Respuesta del servidor:', response);

            await fetchAvailability();
            console.log('Disponibilidad actualizada');
            resetForm();
        } catch (err) {
            console.error("Error detallado al crear disponibilidad:", {
                message: err.message,
                stack: err.stack,
                response: err.response
            });
            alert('Error al crear disponibilidad: ' + (err.message || 'Error desconocido'));
        }
    };

    const handleUpdateAvailability = async () => {
        const { selectedDate, startDate, endDate, editingSlotId } = form;
        if (!selectedDate || !startDate || !endDate || !editingSlotId) {
            alert('Datos inválidos para actualizar. Falta ID, fecha u horario.');
            console.error("Invalid data for update:", form);
            return;
        }

        // Corregir formato de fecha para evitar desfase por zona horaria
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        const startDateTime = new Date(`${dateStr}T${startDate}`);
        const endDateTime = new Date(`${dateStr}T${endDate}`);

        const updates = {
            date: dateStr,
            startDate: startDateTime.toISOString(),
            endDate: endDateTime.toISOString()
        };

        try {
            const token = usersApi.getToken();
            await photographersApi.updateAvailability(token, editingSlotId, updates);
            fetchAvailability();
            resetForm();
        } catch (err) {
            console.error(`Error updating availability slot ${editingSlotId}:`, err);
        }
    };

    const handleEditSlot = (slot) => {
        if (!slot || !slot.date || !slot.startDate || !slot.endDate) {
            console.error("Datos de slot inválidos para editar:", slot);
            return;
        }

        setForm({
            selectedDate: new Date(slot.date),
            startDate: formatTime(slot.startDate),
            endDate: formatTime(slot.endDate),
            editingSlotId: slot.id
        });
        setUi(prev => ({ ...prev, showCalendar: true }));
    };

    const handleDeleteSlot = async (id) => {
        console.log('Iniciando confirmación para eliminar:', id);
        showConfirmation('¿Seguro que quieres eliminar esta disponibilidad?', async (confirmed) => {
            console.log('Respuesta de confirmación:', confirmed);
            if (confirmed) {
                try {
                    const token = usersApi.getToken();
                    await fetch(`${API_URL}/sessions/availability/${id}`, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    fetchAvailability();
                } catch (err) {
                    console.error(err);
                }
            }
        });
    };

    const resetForm = () => {
        setForm({ selectedDate: null, startDate: '', endDate: '', editingSlotId: null });
        setUi({
            showCalendar: false,
            showStartDropdown: false,
            showEndDropdown: false,
            blockedTimes: [],
            blockedDates: [],
            selectedAvailability: []
        });
    };

    const handleLogout = () => {
        usersApi.logout();
        navigate('/login');
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col items-center p-4 overflow-y-auto">
            <header className="w-full flex justify-center items-center p-4 bg-black rounded-lg text-white relative">
                <h1 className="text-xl font-bold">{name}</h1>
                <button onClick={handleLogout} className="bg-red-600 px-1 py-1 rounded absolute font-extrabold right-4">
                    <MdOutlineLogout />
                </button>
            </header>

            {ui.showCalendar ? (
                <AvailabilityForm
                    editing={!!form.editingSlotId}
                    selectedDate={form.selectedDate}
                    startDate={form.startDate}
                    endDate={form.endDate}
                    blockedTimes={ui.blockedTimes}
                    blockedDates={ui.blockedDates}
                    sessions={sessions}
                    availability={availability}
                    showStartDropdown={{
                        value: ui.showStartDropdown,
                        toggle: () => setUi(prev => ({ ...prev, showStartDropdown: !prev.showStartDropdown }))
                    }}
                    showEndDropdown={{
                        value: ui.showEndDropdown,
                        toggle: () => setUi(prev => ({ ...prev, showEndDropdown: !prev.showEndDropdown }))
                    }}
                    onDateChange={handleDateChange}
                    onStartTimeSelect={(time) => setForm(prev => ({ ...prev, startDate: time }))}
                    onEndTimeSelect={(time) => setForm(prev => ({ ...prev, endDate: time }))}
                    onSave={form.editingSlotId ? handleUpdateAvailability : handleSaveAvailability}
                    onCancel={resetForm}
                />
            ) : (
                <>
                    <section className="w-full max-w-lg bg-white p-4 rounded-lg mt-4">
                        <h2 className="text-lg font-bold text-center">Sesiones Programadas</h2>
                        <SessionList sessions={sessions} />
                    </section>

                    <section className="w-full max-w-lg bg-white p-4 rounded-lg mt-4">
                        <h2 className="text-lg font-bold text-center">Disponibilidad Actual</h2>
                        <AvailabilityList
                            groupedAvailability={groupedAvailability}
                            onEdit={handleEditSlot}
                            onDelete={handleDeleteSlot}
                        />
                    </section>

                    <button
                        onClick={() => setUi(prev => ({ ...prev, showCalendar: true }))}
                        className="mt-4 bg-[#B62682] text-white px-4 py-2 rounded-lg"
                    >
                        Definir Disponibilidad
                    </button>
                </>
            )}
        </div>
    );
}

export default HomePhotographer;