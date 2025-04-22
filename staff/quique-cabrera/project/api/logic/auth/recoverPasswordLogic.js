import { User } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'
import { handleAuthError } from './authUtils.js'
import sendRecoveryEmail from '../email/sendRecoveryEmail.js' // Assuming email logic is in logic/email
import crypto from 'crypto'

const recoverPasswordLogic = async (email) => {
    validate.email(email)

    try {
        const user = await User.findOne({ email })

        if (!user) {
            // No lanzar error si no se encuentra, simplemente no hacer nada
            // throw new NotFoundError('User not found')
            console.log(`[RecoverPassword] User not found for email: ${email}, proceeding silently.`)
            return // Terminar silenciosamente
        }

        const token = crypto.randomBytes(32).toString('hex')
        const expires = new Date(Date.now() + 1000 * 60 * 30) // 30 minutos

        user.recoveryToken = token
        user.recoveryTokenExpires = expires
        await user.save()

        const recoveryLink = `${process.env.FRONTEND_URL}/reset-password/${token}` // Ajustar ruta si es necesario
        await sendRecoveryEmail(user.email, recoveryLink)

        // No es necesario devolver nada aquí, la acción es enviar el email

    } catch (error) {
        // Devolver un error genérico o usar handleAuthError
        return handleAuthError(error)
    }
}

export default recoverPasswordLogic 