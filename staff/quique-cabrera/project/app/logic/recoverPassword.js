import { validate, errors } from 'com';

const { ValidationError } = errors;

const recoverPassword = (username) => {
    validate.username(username);
    return fetch(`${import.meta.env.VITE_API_URL}/users/recover-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    })
        .then(res => res.json().then(body => ({ status: res.status, body })))
        .then(({ status, body }) => {
            if (status === 200) return { success: true, message: "Check your email for password reset instructions" };
            const { error, message } = body;
            const ErrorType = errors[error] || ValidationError;
            throw new ErrorType(message);
        })
        .catch(err => {
            if (err instanceof ValidationError) throw err;
            throw new Error(err.message || '❌ Error inesperado al enviar el correo');
        });
};

export default recoverPassword;