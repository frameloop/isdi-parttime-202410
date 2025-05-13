import { User, Photographer } from '../../data/models.js'
import { validate, SystemError, NotFoundError, CredentialsError } from 'com'
import { createAuthResponse, handleAuthError } from './authUtils.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const loginUserLogic = async (username, password) => {
    validate.text(username, 'username')
    validate.password(password)

    try {
        const user = await User.findOne({ username }).select('+password')

        if (!user) {
            throw new NotFoundError('Usuario no encontrado')
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            throw new CredentialsError('Contraseña incorrecta')
        }

        const payload = { sub: user._id.toString(), role: user.role }
        const secret = process.env.JWT_SECRET
        const expiresIn = process.env.JWT_EXPIRES_IN || '8h'

        if (!secret) {
            throw new SystemError('JWT Secret is not configured')
        }

        const token = jwt.sign(payload, secret, { expiresIn })

        // Log generated token details
        try {
            const decoded = jwt.decode(token);
            // console.log('[LoginLogic] Generated Token:', token);
            // console.log('[LoginLogic] Generated Payload Exp (UTC Timestamp):', decoded?.exp);
            if (decoded?.exp) {
                // console.log('[LoginLogic] Generated Expiry Date:', new Date(decoded.exp * 1000).toISOString());
            }
        } catch (decodeError) {
            // console.error('[LoginLogic] Error decoding generated token:', decodeError);
        }

        // Si el usuario es fotógrafo, buscar su documento Photographer
        let photographerId = null;
        if (user.role === 'photographer') {
            const photographer = await Photographer.findOne({ user: user._id });
            if (photographer) {
                photographerId = photographer._id.toString();
            }
        }

        return createAuthResponse(user, token, photographerId);
    } catch (error) {
        return handleAuthError(error)
    }
}

export default loginUserLogic 