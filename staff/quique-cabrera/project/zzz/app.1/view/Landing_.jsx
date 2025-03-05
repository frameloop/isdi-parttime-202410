import React from 'react';

function Landing() {
    console.log("Landing.jsx se ha renderizado correctamente"); // Verificar en la consola

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-red-500">
            <h1 className="text-white text-4xl">¡Hola, Sesiona!</h1>
        </div>
    );
}

export default Landing;
