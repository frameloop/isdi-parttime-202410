import React from 'react';

function Landing({ onLoginClicked }) {
    console.log("Landing.jsx has been rendered correctly"); // Debugging message

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col justify-center items-center">
            {/* Logo image with controlled size */}
            <img
                src="/util/logo_sesiona.png"
                alt="Logo Sesiona"
                className="max-w-[50%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] h-auto mb-6"
            />

            {/* Entry button */}
            <button
                onClick={onLoginClicked}
                className="bg-[#B62682] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[purple-700] transition-all"
            >
                entrar
            </button>

            {/* Footer */}
            <footer className="absolute bottom-4 text-black text-sm font-semibold">
                emestudi © 2025
            </footer>
        </div>
    );
}

export default Landing;
