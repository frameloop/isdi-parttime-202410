import logic from '../../../logic/index.js'

export default async (req, res, next) => {
    const { name, email, phone, username, password, role, coverage_area } = req.body

    try {
        // Validación de campos obligatorios
        if (!name || !email || !phone || !username || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        if (role === 'photographer' && !coverage_area) {
            return res.status(400).json({ error: 'Coverage area is required for photographers' })
        }

        // Prevención de registros duplicados simultáneos (anti-spam o doble clic)
        if (!global.processingUsers) global.processingUsers = {}
        if (global.processingUsers[username]) {
            return res.status(429).json({ error: 'Duplicate request detected' })
        }

        global.processingUsers[username] = true

        // Registro del usuario a través de la lógica
        const user = await logic.registerUser(name, email, phone, username, password, role, coverage_area)

        res.status(201).json({
            success: true,
            message: role === 'photographer'
                ? 'Photographer registered successfully'
                : 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role
            }
        })

    } catch (error) {
        if (error.name === 'DuplicityError') {
            return res.status(409).json({ error: 'El usuario ya está registrado' })
        }

        next(error)
    } finally {
        delete global.processingUsers[username]
    }
}
