import { User } from '../data/models.js'
import sendRecoveryEmail from '../logic/sendRecoveryEmail.js'
import crypto from 'crypto'

const recoverPasswordLogic = async (req) => {
    try {
        const { username } = req.body;

        if (!username || typeof username !== 'string') {
            return {
                error: {
                    error: 'InvalidInput',
                    message: 'El nombre de usuario es obligatorio'
                },
                status: 400
            };
        }

        const user = await User.findOne({ username });

        if (user) {
            const token = crypto.randomBytes(32).toString('hex');
            const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 minutos

            user.recoveryToken = token;
            user.recoveryTokenExpires = expires;
            await user.save();

            const recoveryLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
            await sendRecoveryEmail(user.email, recoveryLink);
        }

        return {
            data: {
                success: true,
                message: 'Si el usuario existe, se ha enviado un email de recuperación'
            }
        };
    } catch (error) {
        console.error('Error en recoverPasswordLogic:', error);
        return {
            error: {
                error: 'ServerError',
                message: 'Internal server error'
            },
            status: 500
        };
    }
};

export default recoverPasswordLogic;