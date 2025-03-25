import logoutUser from '../../../logic/logoutUser.js'

export default async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token || !req.userId) {
            return res.status(400).json({ error: 'Invalid logout request' })
        }

        logoutUser(token)

        res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        })

    } catch (error) {
        console.error('Error en logoutUserHandler:', error)
        next(error)
    }
}
