import jwt from 'jsonwebtoken'

/**
 * Genera un token JWT con el payload proporcionado
 * @param {Object} payload - El payload a incluir en el token
 * @returns {string} El token JWT generado
 */
const generateToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
}

export default generateToken 