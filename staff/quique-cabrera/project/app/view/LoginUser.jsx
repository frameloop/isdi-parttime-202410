import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginUser from '../logic/loginUser';
import { validate } from 'com';

const API_URL = import.meta.env.VITE_API_URL;

function LoginUser() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false); // Estado del popup
    const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito

    const navigate = useNavigate();

    const handleContinue = async () => {
        try {
            console.log("Username being validated:", username);

            if (!username.trim()) {
                throw new Error('Please enter a username');
            }

            validate.username(username);

            // 🔹 Verificamos si el usuario existe en la API
            const response = await fetch(`${API_URL}/users/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error("User does not exist");
            }

            console.log("User verified:", data);

            // 🔹 Guardamos name y email en localStorage
            setName(data.name);
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);

            // 🔹 Pasamos al paso de contraseña
            setStep(2);
            setError(null);

        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            validate.password(password);

            const { token } = await loginUser(username, password, rememberMe);

            if (!token) {
                throw new Error("No token received from API");
            }

            console.log("Token received:", token);
            localStorage.setItem('token', token);
            localStorage.setItem('name', name); // 🔹 Guardamos el nombre en localStorage
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    // 🔹 Función para manejar la recuperación de contraseña
    const handleRecoverPassword = async () => {
        try {
            if (!username.trim()) {
                setError("Please enter your username before requesting a recovery email.");
                return;
            }

            const response = await fetch(`${API_URL}/users/recover-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send recovery email");
            }

            setSuccessMessage("✅ A recovery email has been sent to your email address.");
        } catch (err) {
            setError(err.message);
        } finally {
            setShowPopup(false);
        }
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col justify-center items-center">
            <img
                src="/util/logo_sesiona.png"
                alt="Logo Sesiona"
                className="max-w-[50%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] h-auto mb-6"
            />

            {step === 1 && (
                <>
                    <label className="text-black font-semibold mb-2">Your username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError(null);
                        }}
                        placeholder="Enter your username"
                        className="w-64 p-2 border border-gray-400 rounded-md mb-4"
                    />

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        onClick={handleContinue}
                        className="bg-[#B62682] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all"
                    >
                        Continue
                    </button>
                </>
            )}

            {step === 2 && (
                <form onSubmit={handleLogin} className="flex flex-col items-center">
                    <p className="text-black font-semibold">Hello again</p>
                    <p className="text-black mb-4">{name}</p> {/* 🔹 Ahora muestra el nombre en vez del username */}

                    {/* Campo oculto para mejorar accesibilidad */}
                    <input type="hidden" name="username" value={username} />

                    <label className="text-black font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-64 p-2 border border-gray-400 rounded-md mb-2"
                        autoComplete="current-password"
                    />

                    {/* 🔹 Popup para recuperar contraseña */}
                    <a
                        onClick={() => setShowPopup(true)}
                        className="text-blue-600 text-sm mb-2 hover:underline cursor-pointer"
                    >
                        Forgot your password?
                    </a>

                    {showPopup && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <p className="text-black font-semibold mb-4">
                                    Do you want to receive a recovery email?
                                </p>
                                <div className="flex justify-around">
                                    <button
                                        onClick={handleRecoverPassword}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowPopup(false);
                                            setError(null);
                                        }}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mensaje de éxito tras el envío del email */}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="mr-2"
                        />
                        <label className="text-black text-sm">Remember your details</label>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="bg-[#B62682] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all"
                    >
                        Log in
                    </button>
                </form>
            )}

            <footer className="absolute bottom-4 text-black text-sm font-semibold">
                emestudi © 2025
            </footer>
        </div>
    );
}

export default LoginUser;
