import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginUser from '../logic/loginUser';
import recoverPassword from '../logic/recoverPassword';
import { validate } from 'com';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const API_URL = import.meta.env.VITE_API_URL;

function LoginUser() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [recoverError, setRecoverError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleContinue = () => {
        if (!username.trim()) return setLoginError('Please enter a username');
        validate.username(username);
        fetch(`${API_URL}/users/verify`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username }) })
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error("User does not exist");
                setName(data.name);
                localStorage.setItem('name', data.name);
                localStorage.setItem('email', data.email);
                setStep(2);
                setLoginError(null);
            })
            .catch(err => setLoginError(err.message));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        try {
            validate.password(password);
            loginUser(username, password, rememberMe)
                .then(({ token }) => {
                    const payload = JSON.parse(atob(token.split(".")[1]));
                    localStorage.setItem('token', token);
                    if (!localStorage.getItem('name')) localStorage.setItem('name', payload.name || username);
                    localStorage.setItem('role', payload.role);
                    if (payload.role === 'photographer' && payload.photographerId) localStorage.setItem('photographerId', payload.photographerId);
                    navigate(payload.role === 'customer' ? '/home-customer' : payload.role === 'photographer' ? '/home-photographer' : payload.role === 'administrator' ? '/home-admin' : '/home');
                })
                .catch(err => setLoginError(err.message || "Error al iniciar sesión"));
        } catch (err) {
            setLoginError(err.message || "Contraseña inválida");
        }
    };

    const handleRecoverPassword = () => {
        if (!username.trim()) return setRecoverError("Please enter your username");
        recoverPassword(username)
            .then(data => { setRecoverError(null); setSuccessMessage(data.message); })
            .catch(err => { setSuccessMessage(null); setRecoverError(err.message); })
            .finally(() => setShowPopup(false));
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col justify-center items-center">
            <img src="/util/logo_sesiona.png" alt="Logo Sesiona" className="max-w-[50%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] h-auto mb-6" />
            {step === 1 ? (
                <>
                    <label className="text-black font-semibold mb-2">Usuario</label>
                    <input type="text" value={username} onChange={e => { setUsername(e.target.value); setLoginError(null); setRecoverError(null); setSuccessMessage(null); }} placeholder="Introduce el usuario" className="w-64 p-2 border text-base border-gray-400 text-center rounded-md mb-4" />
                    {loginError && <p className="bg-[#6E82F5] text-white mb-4 p-2 rounded animate-flash">{loginError}</p>}
                    <button onClick={handleContinue} className="bg-[#B62682] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all">continue</button>
                </>
            ) : (
                <form onSubmit={handleLogin} className="flex flex-col items-center">
                    <p className="text-black font-semibold">Bienvenid@!</p>
                    <p className="text-black mb-4">{name}</p>
                    <label className="text-black font-semibold mb-2">Contraseña</label>
                    <div className="relative w-64 mb-2">
                        <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="introduce tu contraseña" className="w-full p-2 text-base border border-gray-400 text-center rounded-md pr-10" autoComplete="current-password" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">{showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</button>
                    </div>
                    <a onClick={() => { setShowPopup(true); setRecoverError(null); setSuccessMessage(null); setLoginError(null); }} className="text-blue-600 text-sm mb-2 hover:underline cursor-pointer">Forgot your password?</a>
                    {loginError && <p className="bg-[#6E82F5] text-white mb-4 p-2 rounded animate-flash">{loginError}</p>}
                    {successMessage && <p className="text-green-600 text-center font-semibold">{successMessage}</p>}
                    {recoverError && <p className="text-red-500 text-center font-semibold">{recoverError}</p>}
                    <div className="flex items-center mb-4">
                        <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="mr-2" />
                        <label className="text-black text-sm">Remember your details</label>
                    </div>
                    <button type="submit" className="bg-[#B62682] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all">entrar</button>
                </form>
            )}
            {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-[#E1F56E] bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <p className="text-black font-semibold mb-4">¿Te enviamos un correo de recuperación?</p>
                        <div className="flex justify-around">
                            <button onClick={handleRecoverPassword} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">Sí, por favor!</button>
                            <button onClick={() => { setShowPopup(false); setRecoverError(null); setSuccessMessage(null); setLoginError(null); }} className="bg-red-500 text-white px-4 py-2 rounded-lg">No, paso!</button>
                        </div>
                    </div>
                </div>
            )}
            <footer className="absolute bottom-4 text-black text-sm font-semibold">emestudi © 2025</footer>
        </div>
    );
}

export default LoginUser;