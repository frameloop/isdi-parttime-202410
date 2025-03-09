// Función para obtener la sesión del usuario basada en el token almacenado
const getUserSession = () => {
    // Obtener el token desde localStorage o sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log(`📥 Token obtenido: ${token || 'No token encontrado'}`);

    // Si no hay token, devolver una Promise resuelta con null
    if (!token) {
        console.warn("⚠ No se encontró token en localStorage ni sessionStorage");
        return Promise.resolve(null); // Asegura que siempre devuelva una Promise
    }
    console.log("✅ Token encontrado, procediendo con la solicitud");

    // Realizar la solicitud al endpoint /users/me con el token
    console.log(`🔍 Enviando solicitud a ${import.meta.env.VITE_API_URL}/users/me con token: ${token}`);
    return fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(res => {
            console.log(`📡 Respuesta recibida con estado: ${res.status}`);
            if (res.status === 200) {
                console.log("✅ Estado 200, parseando respuesta JSON");
                return res.json();
            }
            console.warn("⚠ Estado no 200, eliminando token");
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            console.log("🗑 Token eliminado de localStorage y sessionStorage");
            return null;
        })
        .catch(error => {
            console.error("🚨 Error al realizar la solicitud:", error);
            console.log(`❌ Detalle del error: ${error.message}`);
            return null; // Captura errores y devuelve null
        });
};

console.log("📤 Exportando función getUserSession");
export default getUserSession;