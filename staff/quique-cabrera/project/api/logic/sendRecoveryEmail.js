import sendEmail from './sendEmail.js'; // 📩 Importamos la función de envío de emails

/**
 * 📧 Enviar un correo de recuperación de contraseña
 * @param {string} toEmail - Dirección de correo del usuario
 * @returns {Promise<void>}
 */
export default function sendRecoveryEmail(toEmail) {
    console.log(`📨 Preparing to send recovery email to: ${toEmail}`); // 📌 Log antes de enviar

    // ✉️ Enviar el email con instrucciones de recuperación
    return sendEmail({
        to: toEmail, // 📩 Destinatario
        subject: '🔑 Password Recovery', // 📜 Asunto del correo
        text: 'Click on the link to reset your password.', // 📌 Cuerpo en texto plano
    })
        .then(() => {
            console.log(`✅ Recovery email sent successfully to ${toEmail}`); // 📌 Confirmación de éxito
        })
        .catch(error => {
            console.error('🚨 Error sending recovery email:', error.message); // ❌ Log del error principal
            console.error('📌 Full error details:', error); // 📌 Detalles adicionales del error
            throw new Error('Failed to send recovery email'); // ❌ Lanzar error para manejarlo externamente
        });
}
