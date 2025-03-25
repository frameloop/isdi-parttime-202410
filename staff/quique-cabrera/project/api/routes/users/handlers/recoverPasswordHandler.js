import { User } from '../../../data/models.js'
import sendRecoveryEmail from '../../../logic/sendRecoveryEmail.js'
import crypto from 'crypto'

export default async (req, res, next) => {
    try {
        const { username } = req.body

        if (!username || typeof username !== 'string') {
            return res.status(400).json({
                error: 'InvalidInput',
                message: 'El nombre de usuario es obligatorio'
            })
        }

        const user = await User.findOne({ username })

        if (user) {
            // Generamos token seguro y fecha de expiración
            const token = crypto.randomBytes(32).toString('hex')
            const expires = new Date(Date.now() + 1000 * 60 * 30) // 30 minutos

            user.recoveryToken = token
            user.recoveryTokenExpires = expires
            await user.save()

            const recoveryLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

            await sendRecoveryEmail(user.email, recoveryLink)
        }

        // Respondemos siempre igual (por seguridad)
        res.json({
            success: true,
            message: 'Si el usuario existe, se ha enviado un email de recuperación'
        })

    } catch (error) {
        console.error('Error en recoverPasswordHandler:', error)
        next(error)
    }
}
