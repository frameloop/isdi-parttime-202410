import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarSelector from './CalendarSelector';

function AvailabilityForm({
    editing,
    selectedDate,
    startDate,
    endDate,
    blockedTimes,
    blockedDates,
    sessions,
    availability,
    showStartDropdown,
    showEndDropdown,
    onDateChange,
    onStartTimeSelect,
    onEndTimeSelect,
    onSave,
    onCancel
}) {
    const generateTimeOptions = () => {
        const options = [];
        for (let h = 9; h < 18; h++) {
            options.push(`${h.toString().padStart(2, '0')}:00`, `${h.toString().padStart(2, '0')}:30`);
        }
        options.push("18:00");
        return options;
    };

    return (
        <section className="w-full max-w-lg bg-[#E1F56E] p-4 rounded-lg mt-0">
            <h2 className="text-xl font-bold text-gray-700 text-center">
                {editing ? 'Editar Disponibilidad' : 'Agregar Disponibilidad'}
            </h2>

            <CalendarSelector
                selectedDate={selectedDate}
                availability={availability || []}
                blockedDates={blockedDates || []}
                sessions={sessions || []}
                onChange={onDateChange}
            />

            {selectedDate && (
                <>
                    <p className="text-gray-700 font-semibold mt-2">
                        Fecha seleccionada: {selectedDate.toLocaleDateString()}
                    </p>

                    {/* Hora de inicio */}
                    <label className="block text-gray-700 mt-2">Hora de inicio:</label>
                    <div className="relative">
                        <button
                            className="border p-2 w-full rounded bg-white text-left text-gray-700"
                            onClick={showStartDropdown.toggle}
                        >
                            {startDate || "-- Selecciona hora de inicio --"}
                        </button>

                        {showStartDropdown.value && (
                            <ul className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto shadow-lg">
                                {generateTimeOptions().map(time => {
                                    const isBlocked = blockedTimes.includes(time);
                                    return (
                                        <li
                                            key={time}
                                            className={`p-2 ${isBlocked
                                                ? "text-red-500 bg-red-50 opacity-70 cursor-not-allowed"
                                                : "text-green-600 cursor-pointer hover:bg-gray-100"
                                                }`}
                                            onClick={() => {
                                                if (!isBlocked) {
                                                    onStartTimeSelect(time);
                                                    showStartDropdown.toggle();
                                                }
                                            }}
                                        >
                                            {isBlocked ? `⛔ ${time} (Ocupado)` : `🟩 ${time}`}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* Hora de fin */}
                    <label className="block text-gray-700 mt-2">Hora de fin:</label>
                    <div className="relative">
                        <button
                            className="border p-2 w-full rounded bg-white text-left text-gray-700"
                            onClick={showEndDropdown.toggle}
                        >
                            {endDate || "-- Selecciona hora de fin --"}
                        </button>

                        {showEndDropdown.value && (
                            <ul className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto shadow-lg">
                                {generateTimeOptions().map(time => {
                                    const isBlocked = blockedTimes.includes(time);
                                    return (
                                        <li
                                            key={time}
                                            className={`p-2 ${isBlocked
                                                ? "text-red-500 bg-red-50 opacity-70 cursor-not-allowed"
                                                : "text-green-600 cursor-pointer hover:bg-gray-100"
                                                }`}
                                            onClick={() => {
                                                if (!isBlocked) {
                                                    onEndTimeSelect(time);
                                                    showEndDropdown.toggle();
                                                }
                                            }}
                                        >
                                            {isBlocked ? `⛔ ${time} (Ocupado)` : `🟩 ${time}`}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* Botones */}
                    <div className="flex justify-between mt-4">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={onSave}>
                            {editing ? 'Actualizar' : 'Guardar'}
                        </button>

                        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={onCancel}>
                            Volver
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}

export default AvailabilityForm;
