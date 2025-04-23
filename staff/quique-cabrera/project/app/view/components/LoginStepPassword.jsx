import React from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

function LoginStepPassword({
    name,
    password,
    showPassword,
    rememberMe,
    successMessage,
    loginError,
    recoverError,
    onChangePassword,
    onTogglePassword,
    onToggleRememberMe,
    onRecoverPasswordClick,
    onSubmit
}) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col items-center">
            <p className="text-black font-semibold">¡Bienvenid@!</p>
            <p className="text-black mb-4">{name}</p>

            <label className="text-black font-semibold mb-2">Contraseña</label>
            <div className="relative w-64 mb-2">
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={onChangePassword}
                    placeholder="Introduce tu contraseña"
                    className="w-full p-2 text-base border border-gray-400 text-center rounded-md pr-10"
                    autoComplete="current-password"
                />
                <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                    {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </button>
            </div>

            <a
                onClick={onRecoverPasswordClick}
                className="text-blue-600 text-sm mb-2 hover:underline cursor-pointer"
            >
                ¿Has olvidado tu contraseña?
            </a>

            {loginError && <p className="bg-[#6E82F5] text-white mb-4 p-2 rounded animate-flash">{loginError}</p>}
            {successMessage && <p className="text-green-600 text-center font-semibold">{successMessage}</p>}
            {recoverError && <p className="text-red-500 text-center font-semibold">{recoverError}</p>}

            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={onToggleRememberMe}
                    className="mr-2"
                />
                <label className="text-black text-sm">Recordar mis datos</label>
            </div>

            <button
                type="submit"
                className="bg-[#B62682] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all"
            >
                Entrar
            </button>
        </form>
    );
}

export default LoginStepPassword;
