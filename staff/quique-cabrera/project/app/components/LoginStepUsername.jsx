import React from 'react';

function LoginStepUsername({ username, onChange, onContinue, error }) {
    return (
        <div className="flex flex-col items-center">
            <label className="text-black font-semibold mb-2">Usuario</label>
            <input
                type="text"
                value={username}
                onChange={onChange}
                placeholder="Introduce tu usuario"
                className="w-64 p-2 border text-base border-gray-400 text-center rounded-md mb-4"
            />
            {error && (
                <p className="bg-[#6E82F5] text-white mb-4 p-2 rounded animate-flash">
                    {error}
                </p>
            )}
            <button
                onClick={onContinue}
                className="bg-[#B62682] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all"
            >
                Continuar
            </button>
        </div>
    );
}

export default LoginStepUsername;
