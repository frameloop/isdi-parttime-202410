// Lógica de blacklist de tokens JWT (en memoria)
const blacklist = new Set()

/**
 * Añade un token a la blacklist
 * @param {string} token - El token JWT a invalidar
 * @throws {Error} Si el token es inválido o está vacío
 */
export const blacklistToken = (token) => {
    if (!token || typeof token !== 'string') {
        throw new Error('Token inválido')
    }

    blacklist.add(token)
    console.log(`[TokenBlacklist] Token invalidado. Total en blacklist: ${blacklist.size}`)
}

/**
 * Verifica si un token está en la blacklist
 * @param {string} token - El token JWT a verificar
 * @returns {boolean} true si el token está en la blacklist, false en caso contrario
 * @throws {Error} Si el token es inválido o está vacío
 */
export const isTokenBlacklisted = (token) => {
    if (!token || typeof token !== 'string') {
        throw new Error('Token inválido')
    }

    const isBlacklisted = blacklist.has(token)

    if (isBlacklisted) {
        console.log('[TokenBlacklist] Token invalidado encontrado')
    }

    return isBlacklisted
}

/**
 * Limpia tokens antiguos de la blacklist
 * Esta función debería ser llamada periódicamente
 * @param {number} maxAge - Edad máxima de los tokens en milisegundos
 */
export const cleanBlacklist = (maxAge = 3600000) => { // 1 hora por defecto
    const now = Date.now()
    let cleaned = 0

    blacklist.forEach(token => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            if (payload.exp * 1000 < now) {
                blacklist.delete(token)
                cleaned++
            }
        } catch (error) {
            console.error('[TokenBlacklist] Error al limpiar token:', error)
        }
    })

    if (cleaned > 0) {
        console.log(`[TokenBlacklist] ${cleaned} tokens expirados eliminados. Quedan: ${blacklist.size}`)
    }
} 