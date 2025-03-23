// https://myaccount.google.com/apppasswords
// https://nodemailer.com/about/
// https://nodemailer.com/smtp/
// https://nodemailer.com/examples/

import sendEmail from './sendEmail.js';// O ajusta la ruta si está en otro sitio
import 'dotenv/config';

const toEmail = 'quique@emestudi.es'; // 👈 Cambia esto por tu email real de prueba

sendEmail({
  to: toEmail,
  subject: '📧 Test de correo desde Sesiona',
  text: 'Este es un test directo usando nodemailer. ¡Funciona!'
})
  .then(() => {
    console.log('✅ Email enviado con éxito.');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error al enviar el email:');
    console.error(error.message);
    console.error(error);
    process.exit(1);
  });
