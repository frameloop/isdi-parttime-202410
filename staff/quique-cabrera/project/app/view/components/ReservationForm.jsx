import React from 'react';
import { formatTime, formatDate } from '../../util/dateFormatters.js';

function ReservationForm({
    slot,
    formData,
    errors,
    onChange,
    onServiceChange,
    onCancel,
    onConfirm
}) {
    const servicios = ["Virtual Tour 3D", "Virtual Tour 360", "Video Express"];

    return (
        <section className="bg-white p-4 mt-4 rounded shadow-md">
            <h3 className="text-lg font-bold mb-2">Completa los detalles de la sesión</h3>
            <p className="text-xl mb-4">
                {formatDate(slot.date)}, {formatTime(slot.startDate)} - {formatTime(slot.endDate)}
            </p>

            <select
                name="addressType"
                className="w-full border p-2 rounded mb-2"
                value={formData.addressType}
                onChange={onChange}
            >
                <option value="">tipo de vía</option>
                <option value="Calle">Calle</option>
                <option value="Avenida">Avenida</option>
                <option value="Plaza">Plaza</option>
                <option value="Camino">Camino</option>
            </select>

            <input
                name="street"
                type="text"
                placeholder="nombre de la calle y número"
                className={`w-full border p-2 rounded mb-2 ${errors.street ? 'border-red-500' : ''}`}
                value={formData.street}
                onChange={onChange}
            />

            <input
                name="postalCode"
                type="text"
                placeholder="código postal"
                className="w-full border p-2 rounded mb-2"
                value={formData.postalCode}
                onChange={onChange}
            />

            <input
                name="city"
                type="text"
                placeholder="ciudad"
                className="w-full border p-2 rounded mb-2"
                value={formData.city}
                onChange={onChange}
            />

            <input
                name="province"
                type="text"
                placeholder="provincia"
                className="w-full border p-2 rounded mb-4"
                value={formData.province}
                onChange={onChange}
            />

            <label className="block font-medium mb-1">Servicio</label>
            <div className="mb-4">
                {servicios.map(service => (
                    <label key={service} className="block text-sm">
                        <input
                            type="checkbox"
                            value={service}
                            checked={formData.services.includes(service)}
                            onChange={onServiceChange}
                            className="mr-2"
                        />
                        {service}
                    </label>
                ))}
            </div>

            <div className="flex justify-between">
                <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={onCancel}>atrás</button>
                <button className="bg-purple-700 text-white px-4 py-2 rounded" onClick={onConfirm}>confirmar</button>
            </div>
        </section>
    );
}

export default ReservationForm;
