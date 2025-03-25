import logic from '../../../logic/index.js'
import jwt from 'jsonwebtoken'
import { Photographer } from '../../../data/models.js'

export default async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({
                error: 'ValidationError',
                message: 'Username and password are required'
            })
        }

        // Autenticamos al usuario
        const user = await logic.authenticateUser(username, password)

        if (!user) {
            return res.status(401).json({
                error: 'AuthenticationFailed',
                message: 'Usuario o contraseña incorrectos'
            })
        }

        const payload = { sub: user._id.toString(), role: user.role }
        const response = {
            token: null,
            userId: user._id.toString(),
            name: user.name,
            role: user.role
        }

        // Si es fotógrafo, buscamos su perfil para incluir el ID
        if (user.role === 'photographer') {
            const photographer = await Photographer.findOne({ user: user._id }).select('_id')
            if (photographer) {
                payload.photographerId = photographer._id.toString()
                response.photographerId = photographer._id.toString()
            }
        }

        // Generamos el token JWT
        response.token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json(response)

    } catch (error) {
        console.error('Error en loginUserHandler:', error)
        next(error)
    }
}