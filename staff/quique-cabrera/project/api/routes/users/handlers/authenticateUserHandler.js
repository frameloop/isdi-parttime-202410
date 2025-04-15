import logic from '../../../logic/index.js'

const createAuthResponse = (user, token, photographerId = null) => ({
    token,
    name: user.name,
    role: user.role,
    userId: user._id.toString(),
    ...(photographerId && { photographerId })
})

const handleError = (error, res, next) => {
    const errorHandlers = {
        'MissingCredentials': () => res.status(400).json({
            error: 'BadRequest',
            message: 'Missing username or password'
        }),
        'UserNotFound': () => res.status(404).json({
            error: 'UserNotFound',
            message: 'User not found'
        }),
        'PhotographerNotFound': () => res.status(404).json({
            error: 'NotFound',
            message: 'Photographer profile not found'
        })
    }

    if (error.message?.includes('wrong credentials')) {
        return res.status(401).json({
            error: 'InvalidCredentials',
            message: 'Usuario o contraseña incorrectos'
        })
    }

    const handler = errorHandlers[error.message]
    return handler ? handler() : next(error)
}

export default async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await authenticateUserLogic(username, password)
        const payload = { sub: user._id, role: user.role }

        if (user.role === 'photographer') {
            const photographer = await logic.findPhotographerProfile(user._id)
            payload.photographerId = photographer._id.toString()
            const token = logic.generateToken(payload)
            return res.json(createAuthResponse(user, token, photographer._id.toString()))
        }

        const token = logic.generateToken(payload)
        return res.json(createAuthResponse(user, token))

    } catch (error) {
        handleError(error, res, next)
    }
}
