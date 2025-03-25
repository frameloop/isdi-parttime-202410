import verifyUserExists from '../../../logic/verifyUserExists.js'

export default async (req, res, next) => {
    try {
        const { username } = req.body

        // Validación de entrada
        if (!username || typeof username !== 'string') {
            return res.status(400).json({ error: 'Invalid input', message: 'Username is required' })
        }

        const user = await verifyUserExists(username)

        if (!user) {
            return res.status(404).json({ error: 'UserNotFound', message: 'No se encontró el usuario' })
        }

        // Puedes devolver solo parte del usuario si es sensible
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
        })

    } catch (error) {
        console.error('Error en verifyUserHandler:', error)
        next(error)
    }
}
