// Función para cerrar sesión eliminando el token del almacenamiento
const logoutUser = () => {
    console.log("🔍 Verificando token antes de cerrar sesión");
    const tokenLocal = localStorage.getItem('token');
    const tokenSession = sessionStorage.getItem('token');
    console.log(`📥 Token en localStorage: ${tokenLocal || 'No token encontrado'}`);
    console.log(`📥 Token en sessionStorage: ${tokenSession || 'No token encontrado'}`);

    // Eliminar el token de localStorage
    localStorage.removeItem('token');
    console.log("🗑 Token eliminado de localStorage");

    // Eliminar el token de sessionStorage
    sessionStorage.removeItem('token');
    console.log("🗑 Token eliminado de sessionStorage");

    console.log("✅ Cierre de sesión completado");
};

// Registrar la exportación de la función
console.log("📤 Exportando función logoutUser");
export default logoutUser;

console.log("✅ Módulo de logoutUser configurado y exportado correctamente");