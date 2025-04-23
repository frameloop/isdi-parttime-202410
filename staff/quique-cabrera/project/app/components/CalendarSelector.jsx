import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarSelector({ selectedDate, availability, blockedDates, sessions, onChange }) {
    // Función auxiliar para formatear fechas de manera consistente
    const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Función para determinar la clase CSS de cada día en el calendario
    const tileClassName = ({ date, view }) => {
        if (view !== 'month') return null;

        const currentDate = getFormattedDate(date);

        // Verificar disponibilidad comparando directamente los strings de fecha
        const hasAvailability = availability.some(slot => slot.date === currentDate);

        // Verificar si el día tiene sesiones o está completamente bloqueado
        const isBlocked = blockedDates && blockedDates.includes(currentDate);
        const hasSession = sessions && sessions.some(session => {
            const sessionDate = new Date(session.date);
            return getFormattedDate(sessionDate) === currentDate;
        });

        if (isBlocked) return 'text-red-500 bg-red-100'; // Día completamente ocupado
        if (hasSession) return 'text-orange-500 bg-orange-100'; // Día con alguna sesión
        return hasAvailability ? 'text-black font-extrabold' : 'text-gray-400';
    };

    // Función para determinar si un día debe estar deshabilitado
    const tileDisabled = ({ date, view }) => {
        if (view !== 'month') return false;

        const currentDate = getFormattedDate(date);
        return blockedDates && blockedDates.includes(currentDate);
    };

    return (
        <div className="flex justify-center mt-4">
            <Calendar
                onChange={onChange}
                value={selectedDate}
                className="mt-4 border border-gray-300"
                tileClassName={tileClassName}
                tileDisabled={tileDisabled}
            />
        </div>
    );
}

export default CalendarSelector;
