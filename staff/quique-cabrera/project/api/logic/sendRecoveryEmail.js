import sendEmail from './sendEmail.js';

export default async function sendRecoveryEmail(toEmail) {
    try {
        console.log(`📨 Preparing to send recovery email to: ${toEmail}`);

        await sendEmail({
            to: toEmail,
            subject: 'Password Recovery',
            text: 'Click on the link to reset your password.',
        });

        console.log(`📩 Recovery email sent to ${toEmail}`);
    } catch (error) {
        console.error('🚨 Error sending recovery email:', error);
        throw new Error('Failed to send recovery email');
    }
}
