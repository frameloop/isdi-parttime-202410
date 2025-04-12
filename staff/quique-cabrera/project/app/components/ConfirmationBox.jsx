import React from 'react';

function ConfirmationBox({ session, onClose }) {
    if (!session) return null;

    return (
        <section className="bg-white mt-6 p-4 rounded-xl shadow-md border border-green-400 w-full max-w-lg">
            <h3 className="text-xl font-bold text-green-700 mb-2">✅ ¡Sesión Confirmada!</h3>
            <p className="text-sm text-gray-600 mb-4">Aquí tienes los detalles:</p>
            <ul className="text-sm text-gray-800 space-y-2">
                <li><strong>📅 Fecha:</strong> {new Date(session.date).toLocaleDateString()}</li>
                <li><strong>⏰ Hora:</strong> {session.startTime} - {session.endTime}</li>
                <li><strong>📸 Fotógrafo:</strong> {session.photographer?.name || session.photographer?.firstName || 'Nombre no disponible'}</li>
                <li><strong>📍 Zona:</strong> {session.photographer?.coverage_area || 'No especificada'}</li>
                <li><strong>🏠 Dirección:</strong><br />{`${session.address?.addressType || ''} ${session.address?.street || ''}, ${session.address?.city}, ${session.address?.postalCode} (${session.address?.province})`}</li>
                <li><strong>🎯 Servicios:</strong>
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

