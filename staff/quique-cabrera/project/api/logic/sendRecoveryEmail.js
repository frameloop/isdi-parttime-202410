import sendEmail from './sendEmail.js'

/**
 * Envía un correo de recuperación de contraseña al usuario.
 * @param {string} toEmail - Correo electrónico del destinatario
 * @param {string} recoveryLink - Enlace personalizado con token
 */
export default async function sendRecoveryEmail(toEmail, recoveryLink) {
    try {
        const subject = '🔑 Recupera tu contraseña'
        const text = `
Hola,

Hemos recibido una solicitud para restablecer tu contraseña.

Haz clic en el siguiente enlace para continuar:
${recoveryLink}

Si no solicitaste este cambio, simplemente ignora este mensaje.

Saludos,
El equipo de Emestudi
`.trim()

        await sendEmail({
            to: toEmail,
            subject,
            text
        })
    } catch (error) {
        console.error('Error al enviar correo de recuperación:', error)
        throw new Error('Failed to send recovery email')
    }
}
