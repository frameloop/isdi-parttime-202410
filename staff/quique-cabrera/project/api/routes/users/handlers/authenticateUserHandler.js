import logic from '../../../logic/index.js'
import jwt from 'jsonwebtoken'
import { Photographer } from '../../../data/models.js'

export default async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ error: 'BadRequest', message: 'Missing username or password' })
        }

        const user = await logic.authenticateUser(username, password)

        if (!user) {
            return res.status(404).json({ error: 'UserNotFound', message: 'User not found' })
        }

        // Preparamos los datos base del token
        const payload = { sub: user._id, role: user.role }

        // Si es fotógrafo, añadimos el ID del perfil de fotógrafo
        if (user.role === 'photographer') {
            const photographer = await Photographer.findOne({ user: user._id }).select('_id')

            if (!photographer) {
                return res.status(404).json({ error: 'NotFound', message: 'Photographer profile not found' })
            }

            payload.photographerId = photographer._id.toString()

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

            return res.json({
                token,
                name: user.name,
                role: user.role,
                photographerId: photographer._id.toString(),
                userId: user._id.toString()
            })
        }

        // Para otros roles
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json({
            token,
            name: user.name,
            role: user.role,
            userId: user._id.toString()
        })

    } catch (error) {
        // Si el error viene por credenciales
        if (error.message?.includes('wrong credentials')) {
            return res.status(401).json({ error: 'InvalidCredentials', message: 'Usuario o contraseña incorrectos' })
        }

        next(error)
    }
}
