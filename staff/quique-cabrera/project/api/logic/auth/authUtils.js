import { SystemError, NotFoundError, CredentialsError, DuplicityError /*, UnauthorizedError */ } from 'com';

export function handleAuthError(error) {
    let status = 500;
    let message = 'Error interno del servidor';

    if (error instanceof NotFoundError) {
        status = 404;
        message = error.message;
    } else if (error instanceof CredentialsError) {
        status = 401;
        message = error.message;
    } else if (error instanceof DuplicityError) {
        status = 409;
        message = error.message;
    } else if (error instanceof SystemError) {
        // SystemError ya podría tener un status, pero lo dejamos en 500 por defecto
        message = error.message;
    } else if (error.message) {
        // Capturar otros errores con mensajes
        message = error.message;
    }

    console.error(`[AuthError] Status: ${status}, Message: ${message}, Details: ${error.stack}`);

    return { error: { error: error.constructor.name, message }, status };
}

// Suponiendo que existe un tokenBlacklist
let tokenBlacklist = new Set();

export function blacklistToken(token) {
    tokenBlacklist.add(token);
}

export function isTokenBlacklisted(token) {
    return tokenBlacklist.has(token);
}

export function createAuthResponse(user, token, photographerId = null) {
    return {
        token,
        name: user.name,
        role: user.role,
        userId: user._id.toString(),
        ...(photographerId && { photographerId })
    };
} 