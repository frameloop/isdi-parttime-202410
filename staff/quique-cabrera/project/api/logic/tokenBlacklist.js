// Lógica de blacklist de tokens JWT (en memoria)
const blacklist = new Set()

/**
 * Añade un token a la blacklist
 * @param {string} token
 */
export const blacklistToken = (token) => {
    if (!token) {
        console.warn('[TokenBlacklist] Intento de añadir un token vacío')
        return
    }

    blacklist.add(token)
    console.log(`[TokenBlacklist] Token añadido. Total en blacklist: ${blacklist.size}`)
}

/**
 * Verifica si un token está en la blacklist
 * @param {string} token
 * @returns {boolean}
 */
export const isTokenBlacklisted = (token) => {
    const isBlacklisted = blacklist.has(token)
    console.log(`[TokenBlacklist] Token ${token} está en blacklist: ${isBlacklisted}`)
    return isBlacklisted
}
