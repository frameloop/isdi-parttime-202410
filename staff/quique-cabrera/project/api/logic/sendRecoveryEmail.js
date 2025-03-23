import sendEmail from './sendEmail.js';

export default function sendRecoveryEmail(toEmail) {
    return sendEmail({
        to: toEmail,
        subject: '🔑 Password Recovery',
        text: 'Click on the link to reset your password.'
    })
        .catch(() => { throw new Error('Failed to send recovery email'); });
}