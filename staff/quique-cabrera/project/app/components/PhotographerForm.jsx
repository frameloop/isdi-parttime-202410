import React, { useState } from 'react';

function PhotographerForm({ onSubmit }) {
    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        role: 'photographer',
        coverage_area: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                name: form.name,
                username: form.username,
                email: form.email,
                password: form.password,
                phone: form.phone,
                role: form.role,
                coverage_area: form.coverage_area
            };
            await onSubmit(formData);
            setForm({
                name: '',
                username: '',
                email: '',
                password: '',
                phone: '',
                role: 'photographer',
                coverage_area: ''
            });
        } catch (err) {
            console.error('Error al registrar fotógrafo', err);
        }
    };

    return (
        <form className="w-full max-w-lg bg-[#E1F56E] p-4 rounded-lg" onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold text-gray-700 text-center">Registrar Fotógrafo</h2>

            <input
                name="name"
                type="text"
                placeholder="Nombre completo"
                className="w-full p-2 border my-2"
                value={form.name}
                onChange={handleChange}
            />

            <input
                name="username"
                type="text"
                placeholder="Nombre de usuario"
                className="w-full p-2 border my-2"
                value={form.username}
                onChange={handleChange}
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-2 border my-2"
                value={form.email}
                onChange={handleChange}
            />

            <input
                name="password"
                type="password"
                placeholder="Contraseña"
                className="w-full p-2 border my-2"
                value={form.password}
                onChange={handleChange}
            />

            <input
                name="phone"
                type="tel"
                placeholder="Teléfono"
                className="w-full p-2 border my-2"
                value={form.phone}
                onChange={handleChange}
            />

            <input
                name="coverage_area"
                type="text"
                placeholder="Área de cobertura"
                className="w-full p-2 border my-2"
                value={form.coverage_area}
                onChange={handleChange}
            />

            <button type="submit" className="w-full bg-[#B62682] text-white p-2 rounded mt-2">
                Registrar
            </button>
        </form>
    );
}

export default PhotographerForm;
