import React from 'react';

function AvailableSlotsList({ slots, onReserve }) {
    if (!slots.length) {
        return <p className="text-gray-600">No hay disponibilidad para esta fecha.</p>;
    }

    return (
        <ul className="mt-2">
            {slots.map((slot, index) => (
                <li key={index} className="p-2 border-b flex flex-col sm:flex-row sm:justify-between gap-2">
                    <div>
                        <p className="font-medium">
                            {slot.startTime} - {slot.endTime} - {slot.photographer?.coverage_area || 'Zona no especificada'}
                        </p>
                        <p className="text-sm text-gray-700">
                            📸 {slot.photographer?.name || slot.photographer?.firstName || 'Nombre no disponible'}
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
