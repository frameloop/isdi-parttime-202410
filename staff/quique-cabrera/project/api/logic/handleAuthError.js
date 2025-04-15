export default function handleAuthError(error, res, next) {
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
    };

    if (error.message?.includes('wrong credentials')) {
        return res.status(401).json({
            error: 'InvalidCredentials',
            message: 'Usuario o contraseña incorrectos'
        });
    }

    const handler = errorHandlers[error.message];
    return handler ? handler() : next(error);
}