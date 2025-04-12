import React, { useState } from 'react';

function PhotographerForm({ onSubmit }) {
    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        coverage_area: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(form);
            setForm({
                name: '',
                username: '',
                email: '',
                phone: '',
                password: '',
                coverage_area: ''
            });
        } catch (err) {
            console.error('Error al registrar fotógrafo', err);
        }
    };

    return (
        <form className="w-full max-w-lg bg-[#E1F56E] p-4 rounded-lg" onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold text-gray-700 text-center">Registrar Fotógrafo</h2>
            {['name', 'username', 'email', 'phone', 'password', 'coverage_area'].map(field => (
                <input
                    key={field}
                    name={field}
                    type={
                        field === 'email' ? 'email' :
                            field === 'phone' ? 'tel' :
                                field === 'password' ? 'password' :
                                    'text'
                    }
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                    className="w-full p-2 border my-2"
                    value={form[field]}
                    onChange={handleChange}
                />
            ))}
            <button type="submit" className="w-full bg-[#B62682] text-white p-2 rounded mt-2">Registrar</button>
        </form>
    );
}

export default PhotographerForm;
