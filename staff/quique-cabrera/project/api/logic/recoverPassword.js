import { User } from '../data/models.js';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

const recoverPassword = (username) => {
    console.log(`[RecoverPassword] Request received for username: ${username}`);

    try {
        validate.username(username);
        console.log(`[RecoverPassword] Username validated: ${username}`);
    } catch (error) {
        console.error(`[RecoverPassword] Invalid username format: ${error.message}`);
        return Promise.reject(new SystemError(error.message));
    }

    return User.findOne({ username })
        .then((user) => {
            if (!user) {
                console.warn(`[RecoverPassword] User not found: ${username}`);
                throw new NotFoundError('User not found');
            }

            console.log(`[RecoverPassword] User found: ${username} | Email: ${user.email}`);
            console.log(`[RecoverPassword] Sending recovery email to: ${user.email}`);

            return true;
        })
        .catch((error) => {
            console.error(`[RecoverPassword] Error during password recovery: ${error.message}`);
            throw new SystemError(error.message);
        });
};

export default recoverPassword;