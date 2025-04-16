import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import usePhotographerData from '../hooks/usePhotographerData';
import AvailabilityList from '../components/AvailabilityList';
import SessionList from '../components/SessionList';
import AvailabilityForm from '../components/AvailabilityForm';
import { formatDate, formatTime } from '../util/dateFormatters';
import { getBlockedTimesForDate } from '../util/availabilityUtils';
import { usersApi, photographersApi } from '../logic';

function HomePhotographer() {
    const {
        name,
        photographerId,
        availability,
        sessions,
        fetchAvailability
    } = usePhotographerData();

    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

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
        selectedAvailability: []
    });

    const groupedAvailability = useMemo(() => {
        return availability.reduce((acc, slot) => {
            const date = formatDate(slot.date);
            acc[date] = acc[date] || [];
            acc[date].push({
                ...slot,
                formattedStartTime: formatTime(slot.startDate),
                formattedEndTime: formatTime(slot.endDate)
            });
            return acc;
        }, {});
    }, [availability]);

    const handleDateChange = (date) => {
        const slots = availability.filter(slot => new Date(slot.date).toISOString().split("T")[0] === date.toISOString().split("T")[0]);
        const blocked = getBlockedTimesForDate(date, sessions, availability);

        setForm(prev => ({ ...prev, selectedDate: date }));
        setUi(prev => ({ ...prev, blockedTimes: blocked, selectedAvailability: slots }));
    };

    const handleSaveAvailability = async () => {
        const { selectedDate, startDate, endDate } = form;
        if (!selectedDate || !startDate || !endDate) {
            alert('Selecciona fecha y horario');
            return;
        }

        const dateStr = selectedDate.toLocaleDateString('en-CA');
        const startDateTime = new Date(`${dateStr}T${startDate}`);
        const endDateTime = new Date(`${dateStr}T${endDate}`);

        const payload = {
            photographer: photographerId,
            date: dateStr,
            startDate: startDateTime.toLocaleString('sv'),
            endDate: endDateTime.toLocaleString('sv'),
            available: true
        };

        try {
            const token = usersApi.getToken();
            await fetch(`${API_URL}/sessions/availability`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            fetchAvailability();
            resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditSlot = (slot) => {
        setForm({
            selectedDate: new Date(slot.date),
            startDate: slot.startDate,
            endDate: slot.endDate,
            editingSlotId: slot._id
        });
        setUi(prev => ({ ...prev, showCalendar: true }));
    };

    const handleDeleteSlot = async (id) => {
        if (!confirm('¿Seguro que quieres eliminar esta disponibilidad?')) return;
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
    };

    const resetForm = () => {
        setForm({ selectedDate: null, startDate: '', endDate: '', editingSlotId: null });
        setUi({ showCalendar: false, showStartDropdown: false, showEndDropdown: false, blockedTimes: [], selectedAvailability: [] });
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
                    onSave={handleSaveAvailability}
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