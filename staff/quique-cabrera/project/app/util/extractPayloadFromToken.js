// Función para extraer el payload de un token JWT
function extractPayloadFromToken(token) {
    console.log(`📥 Recibiendo token para extraer payload: ${token || 'No token provided'}`);
    try {
        // Validar que el token exista y sea una cadena
        if (!token || typeof token !== "string") {
            console.warn("⚠ Token inválido o ausente");
            throw new Error("Invalid or missing token.");
        }
        console.log("✅ Token válido, procediendo con la extracción");

        // Dividir el token en sus partes (header, payload, signature)
        console.log("🔍 Dividiendo el token en partes...");
        var parts = token.split('.');
        if (parts.length !== 3) {
            console.warn("⚠ El token no tiene el formato JWT válido (esperado: 3 partes)");
            throw new Error("The token does not have a valid JWT format.");
        }
        console.log(`✅ Token dividido en ${parts.length} partes:`, parts);

        // Extraer la parte del payload (segunda parte del token)
        var payloadB64 = parts[1];
        console.log(`📦 Payload en Base64: ${payloadB64}`);

        // Convertir de Base64 URL-safe a Base64 estándar
        console.log("🔧 Convirtiendo Base64 URL-safe a Base64 estándar...");
        payloadB64 = payloadB64.replace(/-/g, '+').replace(/_/g, '/');
        console.log(`✅ Base64 ajustado: ${payloadB64}`);

        // Decodificar el Base64 a una cadena JSON
        console.log("🔍 Decodificando Base64...");
        var payloadJSON = atob(payloadB64);
        console.log(`✅ Cadena JSON decodificada