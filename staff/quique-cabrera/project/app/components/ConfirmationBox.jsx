import React from 'react';

function ConfirmationBox({ session, onClose }) {
    if (!session) return null;

    // Extraer la hora de la fecha de la sesión
    const sessionTime = new Date(session.date);
    const startTime = sessionTime.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });
    const endTime = new Date(sessionTime.getTime() + 60 * 60 * 1000).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <section className="bg-white mt-6 p-4 rounded-xl shadow-md border border-green-400 w-full max-w-lg">
            <h3 className="text-xl font-bold text-green-700 mb-2">✅ ¡Sesión Confirmada!</h3>
            <p className="text-sm text-gray-600 mb-4">Aquí tienes los detalles:</p>
            <ul className="text-sm text-gray-800 space-y-2">
                <li>
                    <strong>Fecha:</strong>{" "}
                    {new Date(new Date(session.date).setDate(new Date(session.date).getDate())).toLocaleDateString()}
                </li>
                <li><strong>Hora:</strong> {startTime} - {endTime}</li>
                <li><strong>Dirección:</strong><br />{`${session.address?.addressType || ''} ${session.address?.street || ''}, ${session.address?.city}, ${session.address?.postalCode} (${session.address?.province})`}</li>
                <li><strong>Servicios:</strong>
                    <ul className="list-disc ml-6">
                        {session.services.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </li>
            </ul>
            <button
                onClick={onClose}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
                Volver a inicio
            </button>
        </section>
    );
}

export default ConfirmationBox;

