import { validate, errors } from 'com'; // Importa las funciones de validación y los tipos de errores desde el módulo 'com'

// Extrae el tipo de error ValidationError desde el objeto errors
const { ValidationError } = errors;

// Función para manejar la recuperación de contraseña
const recoverPassword = (username) => {
    console.log(`📥 Recibiendo solicitud de recuperación para username: ${username || 'No username provided'}`);

    // Validar el username usando la función validate.username
    console.log("🔍 Validando username...");
    validate.username(username);
    console.log("✅ Username validado correctamente");

    // Realizar la solicitud POST al endpoint de recuperación
    console.log(`📡 Enviando solicitud a ${import.meta.env.VITE_API_URL}/users/recover con username: ${username}`);
    return fetch(`${import.meta.env.VITE_API_URL}/users/recover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    })
        .then(res => {
            console.log(`📡 Respuesta recibida con estado: ${res.status}`);
            return res.json().then(body => ({ status: res.status, body })); // Devuelve un objeto con estado y cuerpo
        })
        .then(({ status, body }) => {
            console.log("🔍 Procesando respuesta:", { status, body });
            if (status === 200) {
                console.log("✅ Estado 200, recuperación exitosa");
                return { success: true, message: "Check your email for password reset instructions" };
            }

            const { error, message } = body;
            console.warn(`⚠ Estado no 200, error detectado: ${error}, mensaje: ${message}`);
            const ErrorType = errors[error] || ValidationError;
            throw new ErrorType(message);
        })
        .catch(err => {
            console.error("🚨 Error en la recuperación de contraseña:", err);
            console.log(`❌ Detalle del error: ${err.message || 'Error inesperado'}`);
            throw new Error(err.message || 'An unexpected error occurred');
        });
};

console.log("📤 Exportando función recoverPassword");
export default recoverPassword;

console.log("✅ Módulo de recoverPassword configurado y exportado correctamente");