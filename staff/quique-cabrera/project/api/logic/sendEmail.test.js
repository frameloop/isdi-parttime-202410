import 'dotenv/config'
import sendEmail from './sendEmail.js'

const testEmail = async () => {
  try {
    console.log('📨 Probando envío de email...')

    const result = await sendEmail({
      to: 'quique@emestudi.es',
      subject: '🧪 Test Sesiona Email',
      text: 'Este es un email de prueba enviado desde el sistema de Sesiona.',
      html: '<h1>Sesiona</h1><p>Este es un email de <strong>prueba</strong>.</p>'
    })

    console.log('✅ Resultado:', result)
  } catch (error) {
    console.error('❌ Error al enviar email:', error.message)
  }
}

testEmail()
