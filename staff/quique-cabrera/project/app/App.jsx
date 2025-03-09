import React, { useEffect, useState } from 'react'; // Importa React y los hooks useEffect y useState
import { Routes, Route, Navigate } from 'react-router-dom'; // Importa componentes de enrutamiento
import Landing from './view/Landing'; // Importa el componente de la página de inicio
import LoginUser from './view/LoginUser'; // Importa el componente para el login de usuarios
import RecoverPassword from './view/RecoverPassword'; // Importa el componente para recuperación de contraseña
import HomeCustomer from './view/HomeCustomer'; // Importa el componente de inicio para clientes
import HomePhotographer from './view/HomePhotographer'; // Importa el componente de inicio para fotógrafos
import HomeAdmin from './view/HomeAdmin'; // Importa el componente de inicio para administradores
import getUserSession from './logic/getUserSession'; // Importa la función para obtener la sesión del usuario

// Registrar las importaciones para depuración
console.log("📥 Importando React, useEffect y useState desde 'react'");
console.log("📥 Importando Routes, Route y Navigate desde 'react-router-dom'");
console.log("📥 Importando componente Landing desde './view/Landing'");
console.log("📥 Importando componente LoginUser desde './view/LoginUser'");
console.log("📥 Importando componente RecoverPassword desde './view/RecoverPassword'");
console.log("📥 Importando componente HomeCustomer desde './view/HomeCustomer'");
console.log("📥 Importando componente HomePhotographer desde './view/HomePhotographer'");
console.log("📥 Importando componente HomeAdmin desde './view/HomeAdmin'");
console.log("📥 Importando función getUserSession desde './logic/getUserSession'");

// Componente principal de la aplicación
function App() {
    // Estado para almacenar los datos del usuario autenticado
    const [user, setUser] = useState(null);
    console.log("🌱 Estado inicial de user:", user);

    // Estado para manejar la carga mientras se verifica la sesión
    const [loading, setLoading] = useState(true);
    console.log("🌱 Estado inicial de loading:", loading);

    // Efecto para verificar la sesión del usuario al cargar la aplicación
    useEffect(() => {
        console.log("🔍 Iniciando verificación de sesión con getUserSession");
        getUserSession()
            .then(user => {
                console.log("✅ Sesión obtenida:", user);
                setUser(user);
                console.log("🗂 Actualizando estado user:", user);
                setLoading(false);
                console.log("🗂 Actualizando estado loading: false");
            })
            .catch(error => {
                console.error("🚨 Error al obtener la sesión:", error);
                console.log("❌ Detalle del error:", error.message);
                setLoading(false);
                console.log("🗂 Actualizando estado loading: false (tras error)");
            });
    }, []); // Array vacío asegura que el efecto solo se ejecute al montar el componente

    // Mostrar un mensaje de carga mientras se verifica la sesión
    if (loading) {
        console.log("⏳ Mostrando pantalla de carga...");
        return <div>Loading...</div>;
    }

    console.log("✅ Verificación de sesión completada, renderizando rutas");
    // Renderizar las rutas de la aplicación
    return (
        <Routes>
            {/* Redirigir a /home-customer si hay usuario, o a /landing si no lo hay */}
            <Route path="/" element={<Navigate to={user ? "/home-customer" : "/landing"} />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
            <Route path="/home-customer" element={<HomeCustomer />} />
            <Route path="/home-photographer" element={<HomePhotographer />} />
            <Route path="/home-admin" element={<HomeAdmin />} />
        </Routes>
    );
}

console.log("📤 Exportando componente App");
export default App;

console.log("✅ Componente App configurado y exportado correctamente");