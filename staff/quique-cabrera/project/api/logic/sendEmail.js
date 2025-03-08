import nodemailer from 'nodemailer';
import 'dotenv/config';

// 📌 Verificar si las variables de entorno están bien cargadas
console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
console.log('🔑 EMAIL_PASS:', process.env.EMAIL_PASS ? 'Cargada' : 'No Cargada');

// 📬 Configurar Nodemailer con SMTP seguro de Gmail
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // 🌎 Servidor SMTP de Gmail
    port: 465, // 🔐 Puerto seguro con SSL
    secure: true, // ✅ true para utilizar SSL/TLS
    auth: {
        user: process.env.EMAIL_USER, // 📧 Usuario de email
        pass: process.env.EMAIL_PASS  // 🔑 Contraseña del email
    }
});

// 📩 Función para enviar correos electrónicos
const sendEmail = async ({ to, subject, text, html }) => {
    try {
        console.log(`📩 Attempting to send email to: ${to}`); // 📌 Destinatario
        console.log(`📜 Subject: ${subject}`); // 📌 Asunto del correo
        console.log(`✉️ Text: ${text}`); // 📌 Contenido en texto plano

        // 🚀 Enviar el correo utilizando Nodemailer
        const info = await transporter.sendMail({
            from: `"Sesiona Support" <${process.env.EMAIL_USER}>`, // 📌 Remitente
            to, // 📌 Destinatario(s)
            subject, // 📌 Asunto
            text, // 📌 Cuerpo en texto plano
            html  // 📌 Cuerpo en HTML (opcional)
        });

        console.log(`✅ Email sent successfully! Message ID: ${info.messageId}`); // 📌 Confirmación de éxito
        return { success: true, message: 'Email sent successfully' };

    } catch (error) {
        console.error('❌ Error sending email:', error.message); // 🚨 Error de envío
        console.error('📌 Full error details:', error); // 📌 Información detallada del error
        throw new Error('Failed to send email'); // ❌ Lanzar error para manejarlo externamente
    }
};

// 📤 Exportamos la función para usarla en otros archivos
export default sendEmail;
