const getUserSession = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log(`📥 Token obtenido: ${token || 'No token encontrado'}`);

    if (!token) {
        console.warn("⚠ No se encontró token en localStorage ni sessionStorage");
        return null;
    }
    console.log("✅ Token encontrado, procediendo con la solicitud");

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log(`📡 Respuesta recibida con estado: ${response.status}`);

        if (response.status === 200) {
            console.log("✅ Estado 200, parseando respuesta JSON");
            return response.json();
        }

        if (response.status === 401) {
            console.warn("⚠ Token inválido o expirado. Eliminando...");
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        } else {
            console.warn(`⚠ Estado inesperado ${response.status}. No eliminamos el token.`);
        }

        return null;
    } catch (error) {
        console.error("🚨 Error al realizar la solicitud:", error);
        return null;
    }
};

console.log("📤 Exportando función getUserSession");
export default getUserSession;
