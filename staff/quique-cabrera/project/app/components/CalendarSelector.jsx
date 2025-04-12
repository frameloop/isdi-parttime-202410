import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarSelector({ selectedDate, availability, onChange }) {
    const tileClassName = ({ date, view }) => {
        if (view !== 'month') return null;

        const currentDate = date.toISOString().split("T")[0];
        const hasAvailability = availability.some(slot =>
            new Date(slot.date).toISOString().split("T")[0] === currentDate
        );

        return hasAvailability ? 'text-black font-extrabold' : 'text-gray-400';
    };

    return (
        <div className="flex justify-center mt-4">
            <Calendar
                onChange={onChange}
                value={selectedDate}
                className="mt-4 border border-gray-300"
                tileClassName={tileClassName}
            />
        </div>
    );
}

export default CalendarSelector;
