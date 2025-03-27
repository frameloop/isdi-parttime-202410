import 'dotenv/config'
import sendRecoveryEmail from './sendRecoveryEmail.js'

const runTest = async () => {
    try {
        const emailDestino = 'quique@emestudi.es' // 👈 Cambia por una dirección válida
        const recoveryLink = 'https://sesiona.com/reset-password?token=abc123xyz'

        console.log(`🔐 Enviando email de recuperación a: ${emailDestino}`)

        await sendRecoveryEmail(emailDestino, recoveryLink)

        console.log('✅ Email de recuperación enviado correctamente.')
    } catch (error) {
        console.error('❌ Error durante el envío:', error.message)
    }
}

runTest