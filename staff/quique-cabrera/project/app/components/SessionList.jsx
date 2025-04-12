import React from 'react';

function SessionList({ sessions }) {
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
                    <p className="text-sm text-gray-700">
                        {`${session.address?.type || ''} ${session.address?.street || ''}, ${session.address?.city || ''}, ${session.address?.postalCode || ''} (${session.address?.province || ''})`}
                    </p>
                    <p className="text-sm text-gray-700">
                        {session.services?.join(', ')}
                    </p>
                    <p className="text-sm text-gray-700">
                        {session.customer?.user?.name || 'Desconocido'} - T. {session.customer?.user?.phone || 'Desconocido'}
                    </p>
                </li>
            ))}
        </ul>
    );
}

export default SessionList;
