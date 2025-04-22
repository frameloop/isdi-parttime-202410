import sendEmail from './sendEmail.js'
import { validate, SystemError } from 'com'

const sendRecoveryEmail = async (email, recoveryLink) => {
    try {
        validate.email(email)
        validate.text(recoveryLink)

        const subject = 'Recuperación de contraseña'
        const text = `Haz clic en el siguiente enlace para restablecer tu contraseña: ${recoveryLink}`

        await sendEmail(email, subject, text)
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default sendRecoveryEmail 