import nodemailer from 'nodemailer';
import 'dotenv/config';

// Verificar si las variables de entorno están bien cargadas
console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
console.log('🔑 EMAIL_PASS:', process.env.EMAIL_PASS ? 'Cargada' : 'No Cargada');

// Configurar Nodemailer con SMTP más seguro
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true para SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Función para enviar correos
const sendEmail = async ({ to, subject, text, html }) => {
    try {
        console.log(`📩 Attempting to send email to: ${to}`);
        console.log(`📜 Subject: ${subject}`);
        console.log(`✉️ Text: ${text}`);

        const info = await transporter.sendMail({
            from: `"Sesiona Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });

        console.log(`✅ Email sent successfully: ${info.messageId}`);
        return { success: true, message: 'Email sent successfully' };

    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        console.error('📌 Full error details:', error);
        throw new Error('Failed to send email');
    }
};

export default sendEmail;
