import { User } from '../data/models.js';
import { validate, errors } from 'com';

const { SystemError, CredentialsError } = errors;

const verifyUserExists = async (username) => {
    try {
        validate.username(username);

        const user = await User.findOne({ username });

        if (!user) throw new CredentialsError('User not found');

        return { success: true, name: user.name, email: user.email };
    } catch (error) {
        throw new SystemError(error.message);
    }
};

export default verifyUserExists;
