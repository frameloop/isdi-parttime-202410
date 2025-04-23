import React from 'react';
import { formatDate, formatTime } from '../../util/dateFormatters.js';

function AvailabilityList({ groupedAvailability, onEdit, onDelete }) {
    const sortedDates = Object.keys(groupedAvailability).sort((a, b) => new Date(a) - new Date(b));

    if (sortedDates.length === 0) {
        return <p className="text-center text-gray-500">No hay disponibilidad configurada.</p>;
    }

    return (
        <div className="space-y-3">
            {sortedDates.map(date => (
                <div key={date}>
                    <h3 className="font-semibold text-center text-sm uppercase tracking-wide">{formatDate(date)}</h3>
                    <ul className="divide-y divide-gray-200 px-2">
                        {groupedAvailability[date]
                            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                            .map(slot => (
                                <li key={slot.id} className="flex justify-between items-center text-sm border-b py-1">
                                    <span>{slot.formattedStartTime} - {slot.formattedEndTime}</span>
                                    <div className="flex space-x-2">
                                        <button onClick={() => onEdit(slot)} className="text-blue-500 font-bold">✏️</button>
                                        <button onClick={() => onDelete(slot.id)} className="text-red-500 font-bold">❌</button>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default AvailabilityList;
