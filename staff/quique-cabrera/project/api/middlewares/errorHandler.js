import { ValidationError, SystemError, DuplicityError, CredentialsError, NotFoundError, OwnershipError } from 'com';

export default (error, req, res, next) => {
    console.error('Error Handler:', error);

    let statusCode = 500;
    let errorType = 'SystemError';

    if (error instanceof NotFoundError) {
        statusCode = 404;
        errorType = 'NotFoundError';
    } else if (error instanceof OwnershipError) {
        statusCode = 403;
        errorType = 'OwnershipError';
    } else if (error instanceof CredentialsError) {
        statusCode = 401;
        errorType = 'CredentialsError';
    } else if (error instanceof DuplicityError) {
        statusCode = 409;
        errorType = 'DuplicityError';
    } else if (error instanceof ValidationError) {
        statusCode = 400;
        errorType = 'ValidationError';
    } else if (error instanceof SystemError) {
        statusCode = error.status || 500;
        errorType = 'SystemError';
    }

    const errorResponse = {
        error: errorType,
        message: error.message || 'Se produjo un error en el servidor'
    };

    res.status(statusCode).json(errorResponse);
};