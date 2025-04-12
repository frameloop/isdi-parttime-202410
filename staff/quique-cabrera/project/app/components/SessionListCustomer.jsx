import React from 'react';

function SessionListCustomer({ sessions, onCancel }) {
    if (!sessions.length) {
        return <p className="text-gray-600 text-center">No tienes sesiones programadas.</p>;
    }

    return (
        <ul className="mt-2">
            {sessions.map((session, index) => (
                <li key={index} className="p-4 rounded mb-2 bg-white">
                    <p className="font-semibold text-gray-800">
                        {new Date(session.date).toLocaleString('es-ES')}
                    </p>
                    <p className="text-sm">
                        {`${session.address?.type || ''} ${session.address?.street || ''}, ${session.address?.city || ''}, ${session.address?.postalCode || ''} (${session.address?.province || ''})`}
                    </p>
                    <p className="text-sm">{session.services?.join(', ')}</p>
                    <p className="text-sm">
                        {session.photographer?.user?.name || 'Desconocido'} - T. {session.photographer?.user?.phone || 'Desconocido'}
                    </p>
                    <button
                        onClick={() => onCancel(session._id)}
                        className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                        Cancelar sesión
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default SessionListCustomer;
