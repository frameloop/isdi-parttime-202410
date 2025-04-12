import React from 'react';

function AvailabilityList({ groupedAvailability, onEdit, onDelete }) {
    if (!Object.keys(groupedAvailability).length) {
        return <p className="text-gray-600 text-center">No hay disponibilidad configurada.</p>;
    }

    return (
        <>
            {Object.entries(groupedAvailability).map(([date, slots]) => (
                <div key={date} className="mb-4">
                    <h3 className="text-md font-semibold text-gray-800 mb-1">{date}</h3>
                    <ul>
                        {slots.map(slot => (
                            <li key={slot._id} className="flex justify-between items-center text-sm border-b py-1">
                                <span className="font-medium">
                                    {slot.formattedStartTime} - {slot.formattedEndTime}
                                </span>
                                <div className="flex gap-2">
                                    <button onClick={() => onEdit(slot)} className="text-blue-500 font-bold">🖊</button>
                                    <button onClick={() => onDelete(slot._id)} className="text-red-500 font-bold">❌</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
}

export default AvailabilityList;
