import React from 'react';
import { formatDateTime } from '../util/dateFormatters';

function SessionList({ sessions }) {
    if (!sessions.length) {
        return <p className="text-gray-600 text-center">No tienes sesiones programadas.</p>;
    }

    console.log("Sessions in component:", sessions);

    return (
        <ul className="mt-2">
            {sessions.map((session, index) => {
                // Extraer información del cliente según la estructura disponible
                let customerName = 'Desconocido';
                let customerPhone = 'Desconocido';

                if (session.customer) {
                    if (typeof session.customer === 'object') {
                        customerName = session.customer.name || 'Desconocido';
                        customerPhone = session.customer.phone || 'Desconocido';
                    }
                }

                return (
                    <li key={index} className="p-4 rounded mb-2 bg-white">
                        <p className="font-semibold text-gray-800">
                            {formatDateTime(session.date)}
                        </p>
                        <p className="text-sm text-gray-700">
                            {`${session.address?.type || ''} ${session.address?.street || ''}, ${session.address?.city || ''}, ${session.address?.postalCode || ''} (${session.address?.province || ''})`}
                        </p>
                        <p className="text-sm text-gray-700">
                            {session.services?.join(', ')}
                        </p>
                        <p className="text-sm text-gray-700">
                            {customerName} - T. {customerPhone}
                        </p>
                    </li>
                );
            })}
        </ul>
    );
}

export default SessionList;
