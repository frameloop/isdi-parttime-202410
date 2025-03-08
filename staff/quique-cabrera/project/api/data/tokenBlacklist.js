// 🛑 Conjunto donde se almacenan los tokens invalidados (blacklist)
const blacklist = new Set();

/**
 * 🚫 Agrega un token a la lista negra, impidiendo su uso posterior
 * @param {string} token - El token que se debe invalidar
 */
export const blacklistToken = (token) => {
    if (!token) {
        console.warn('⚠️ Intento de añadir un token vacío a la blacklist.');
        return;
    }

    console.log('🚨 Añadiendo token a la blacklist:', token);
    blacklist.add(token);
    console.log(`✅ Token añadido correctamente. Total en blacklist: ${blacklist.size}`);
};

/**
 * 🔍 Verifica si un token ha sido invalidado previamente
 * @param {string} token - El token a verificar
 * @returns {boolean} - Devuelve true si el token está en la blacklist, false si no lo está
 */
export const isTokenBlacklisted = (token) => {
    const isBlacklisted = blacklist.has(token);
    console.log(`🔎 Verificando token: ${token} | Está en blacklist: ${isBlacklisted}`);
    return isBlacklisted;
};
