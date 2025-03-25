import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"Sesiona Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        throw new Error('Failed to send email');
    }
};

export default sendEmail;