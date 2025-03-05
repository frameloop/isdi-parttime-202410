import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginUser from '../logic/loginUser';
import { validate } from 'com';

const API_URL = import.meta.env.VITE_API_URL;

function LoginUser() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleContinue = () => {
        try {
            console.log("Username being validated:", username);

            if (typeof username !== 'string' || username.trim() === '') {
                throw new Error('Invalid username format');
            }

            validate.username(username);

            setStep(2);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        try {
            validate.password(password);

            loginUser(username, password, rememberMe)
                .then(({ token }) => {
                    if (!token) {
                        throw new Error("No token received from API");
                    }

                    console.log("Token received:", token);
                    localStorage.setItem('token', token);
                    localStorage.setItem('username', username);
                    navigate('/home');
                })
                .catch(err => setError(err.message));

        } catch (err) {
            setError(err.message);
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
                        onChange={(e) => setUsername(e.target.value)}
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
                    <p className="text-black mb-4">{username}</p>

                    <label className="text-black font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-64 p-2 border border-gray-400 rounded-md mb-2"
                    />

                    <a
                        onClick={() => navigate('/recover-password')}
                        className="text-blue-600 text-sm mb-2 hover:underline cursor-pointer"
                    >
                        Forgot your password?
                    </a>



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
