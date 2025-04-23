import React from 'react';

function PhotographerSelector({ photographers, onSelect }) {
    return (
        <div className="mt-4">
            <h3 className="text-gray-700 font-semibold mb-2">Selecciona un fotógrafo</h3>
            <div className="grid grid-cols-1 gap-2">
                {photographers.map(photographer => (
                    <button
                        key={photographer.id}
                        onClick={() => onSelect(photographer.id)}
                        className="bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                        <h4 className="font-medium text-gray-900">{photographer.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                            Área de cobertura: {photographer.coverage_area}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PhotographerSelector; 