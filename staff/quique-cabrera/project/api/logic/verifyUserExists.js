import { User } from '../data/models.js';
import { validate, errors } from 'com';

const { SystemError, CredentialsError } = errors;

const verifyUserExists = (username) => {
    console.log('[verifyUserExists] Checking user:', username);

    try {
        validate.username(username);
        console.log('[verifyUserExists] Username validation passed:', username);

        return User.findOne({ username })
            .then(user => {
                if (!user) {
                    console.error('[verifyUserExists] User not found:', username);
                    throw new CredentialsError('User not found');
                }

                console.log('[verifyUserExists] User found:', user.name, '| Email:', user.email);
                return { success: true, name: user.name, email: user.email };
            })
            .catch(error => {
                console.error('[verifyUserExists] Database error:', error.message);
                throw new SystemError(error.message);
            });
    } catch (error) {
        console.error('[verifyUserExists] Unexpected error:', error.message);
        throw new SystemError(error.message);
    }
};

export default verifyUserExists;
