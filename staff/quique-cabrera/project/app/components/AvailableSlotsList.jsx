import React from 'react';
import { formatTime } from '../util/dateFormatters';

function AvailableSlotsList({ slots, onReserve }) {
    if (!slots.length) {
        return <p className="text-gray-600">No hay disponibilidad para esta fecha.</p>;
    }

    return (
        <ul className="mt-2">
            {slots.map((slot, index) => (
                <li key={slot.id || index} className="p-2 border-b flex flex-col sm:flex-row sm:justify-between gap-2">
                    <div>
                        <p className="font-medium">
                            {formatTime(slot.startDate)} - {formatTime(slot.endDate)}
                        </p>
                        <p className="text-sm text-gray-700">
                            📸 {slot.photographer?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            📍 {slot.photographer?.coverage_area}
                        </p>
                    </div>
                    <button
                        className="bg-green-500 text-white px-3 py-1 rounded self-start sm:self-center"
                        onClick={() => onReserve(slot)}
                    >
                        Reservar
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default AvailableSlotsList;
