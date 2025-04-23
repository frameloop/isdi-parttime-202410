import React from 'react';

function PhotographerList({ photographers, onDelete }) {
    return (
        <section className="w-full max-w-lg bg-[#E1F56E] p-4 rounded-lg mt-0">
            <h2 className="text-lg font-bold text-gray-700 text-center">Fotógrafos Registrados</h2>

            {photographers.length ? (
                <ul>
                    {photographers.map((photographer, index) => (
                        <li key={photographer.id || index} className="p-2 border-b font-bold flex justify-between">
                            <span>{photographer.user?.name || photographer.name || `Fotógrafo ${index + 1}`}</span>
                            <button
                                onClick={() => onDelete(photographer.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600 text-center">No hay fotógrafos registrados.</p>
            )}
        </section>
    );
}

export default PhotographerList;
