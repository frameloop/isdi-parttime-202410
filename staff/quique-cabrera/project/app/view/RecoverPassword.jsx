import React, { useState } from 'react';
import { validate } from 'com';
import recoverPassword from '../logic/recoverPassword';

function RecoverPassword() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRecover = async () => {
        try {
            setError(null);
            setSuccessMessage(null);
            if (!username || typeof username !== 'string') throw new Error('Username must be a non-empty string');
            validate.username(username);
            setIsLoading(true);
            const result = await recoverPassword(username);
            setSuccessMessage(result.message);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-black tracking-wider mb-6">Recover Password</h1>
            <label className="text-black font-semibold mb-2">Enter your username</label>
            <input type="text" value={username} onChange={e => { setUsername(e.target.value); setError(null); setSuccessMessage(null); }} placeholder="Enter your username" className="w-64 p-2 border border-gray-400 rounded-md mb-4 text-center" />
            {error && <p className="text-red-500 font-medium mb-2">{error}</p>}
            {successMessage && <p className="text-green-700 font-medium mb-2">{successMessage}</p>}
            {isLoading && <p className="text-black text-sm mb-2 animate-pulse">Sending recovery email...</p>}
            <button onClick={handleRecover} disabled={isLoading} className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all disabled:opacity-50">{isLoading ? 'Sending...' : 'Recover Password'}</button>
            <footer className="absolute bottom-4 text-black text-sm font-semibold">emestudi © 2025</footer>
        </div>
    );
}

export default RecoverPassword;