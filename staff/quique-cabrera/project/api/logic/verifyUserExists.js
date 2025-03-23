import { User } from '../data/models.js';
import { validate, errors } from 'com';

const { SystemError, CredentialsError } = errors;

const verifyUserExists = (username) => {
    try {
        validate.username(username);
        return User.findOne({ username })
            .then(user => {
                if (!user) throw new CredentialsError('User not found');
                return { success: true, name: user.name, email: user.email };
            })
            .catch(error => { throw new SystemError(error.message); });
    } catch (error) {
        throw new SystemError(error.message);
    }
};

export default verifyUserExists;