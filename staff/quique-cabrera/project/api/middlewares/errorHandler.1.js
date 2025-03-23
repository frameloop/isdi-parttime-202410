import { errors } from 'com';

const { ValidationError, SystemError, DuplicityError, CredentialsError, NotFoundError, OwnershipError } = errors;

export default (error, req, res, next) => {
    console.error(`[errorHandler] Error detected: ${error.constructor.name} - ${error.message}`);

    if (error instanceof NotFoundError) {
        console.log('[errorHandler] Handling NotFoundError');
        res.status(404).json({ error: error.constructor.name, message: error.message });
    } else if (error instanceof OwnershipError) {
        console.log('[errorHandler] Handling OwnershipError');
        res.status(403).json({ error: error.constructor.name, message: error.message });
    } else if (error instanceof CredentialsError) {
        console.log('[errorHandler] Handling CredentialsError');
        res.status(401).json({ error: error.constructor.name, message: error.message });
    } else if (error instanceof DuplicityError) {
        console.log('[errorHandler] Handling DuplicityError');
        res.status(409).json({ error: error.constructor.name, message: error.message });
    } else if (error instanceof ValidationError) {
        console.log('[errorHandler] Handling ValidationError');
        res.status(400).json({ error: error.constructor.name, message: error.message });
    } else if (error instanceof SystemError) {
        console.log('[errorHandler] Handling SystemError');
        res.status(500).json({ error: error.constructor.name, message: error.message });
    } else {
        console.log('[errorHandler] Handling Unknown Error as SystemError');
        res.status(500).json({ error: SystemError.name, message: error.message });
    }
};
