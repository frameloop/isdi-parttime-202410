import React, { useState } from 'react';
import { validate } from 'com';

function RecoverPassword() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const handleRecover = () => {
        try {
            if (!username || typeof username !== 'string') throw new Error('Username must be a non-empty string');
            validate.username(username);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-black tracking-wider mb-6">Recover Password</h1>
            <label className="text-black font-semibold mb-2">Enter your username</label>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-64 p-2 border border-gray-400 rounded-md mb-4"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
                onClick={handleRecover}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all"
            >
                Recover Password
            </button>
            <footer className="absolute bottom-4 text-black text-sm font-semibold">
                emestudi © 2025
            </footer>
        </div>
    );
}

export default RecoverPassword;