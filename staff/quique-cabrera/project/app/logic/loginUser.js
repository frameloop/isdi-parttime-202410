// Función para autenticar un usuario mediante una solicitud al servidor
const loginUser = (username, password) => {
    // Realizar una solicitud POST al endpoint de autenticación con las credenciales
    console.log(`📡 Iniciando solicitud de login para el usuario: ${username}`);
    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(res => {
            console.log(`📡 Respuesta recibida con estado: ${res.status}`);
            return res.json(); // ✅ Ahora recibirá un JSON con { token: "..." }
        })
        .then(data => {
            console.log("🔍 Respuesta de la API:", data); // 🔍 Verifica la respuesta en consola (ya presente)

            if (data.token) {
                console.log(`✅ Token recibido: ${data.token}`);
                sessionStorage.setItem("token", data.token); // ✅ Guarda el token
                console.log("🗂 Token guardado en sessionStorage");
                return { token: data.token };
            } else {
                console.warn("⚠ No se recibió un token en la respuesta");
                throw new Error("Password incorrecto"); // No se recibió un token
            }
        })
        .catch(error => {
            console.error("🚨 Error en el login:", error.message); // Ya presente
            console.log(`❌ Detalle del error: ${error.message}`);
            throw error;
        });
};

console.log("📤 Exportando función loginUser");
export default loginUser;