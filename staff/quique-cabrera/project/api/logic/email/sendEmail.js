import nodemailer from 'nodemailer'
import { validate, SystemError } from 'com'

const sendEmail = async (to, subject, text) => {
    try {
        validate.email(to)
        validate.text(subject)
        validate.text(text)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        }

        await transporter.sendMail(mailOptions)
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default sendEmail 