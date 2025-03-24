import { User } from '../data/models.js';
import { validate, errors } from 'com';
import bcrypt from 'bcryptjs';

const { SystemError, CredentialsError } = errors;

const authenticateUser = (username, password) => {
    console.log('[authenticateUser] Received:', username, password);

    validate.username(username);
    validate.password(password);

    return User.findOne({ username }).select('+password role') // 🔹 Aseguramos que `role` se recupere
        .then(user => {
            if (!user) {
                console.error('[authenticateUser] ❌ User not found:', username);
                throw new CredentialsError('user: wrong credentials');
            }

            console.log('[authenticateUser] ✅ Found user:', user.username);
            console.log('[authenticateUser] 🔑 Role:', user.role);
            console.log('[authenticateUser] Stored Hashed Password:', user.password || 'NOT FOUND');

            if (!user.password) {
                console.error('[authenticateUser] ❌ Password is missing from DB');
                throw new SystemError('Invalid user data: password is missing');
            }

            return bcrypt.compare(password, user.password)
                .then(match => {
                    console.log('[authenticateUser] 🔍 Password match:', match);

                    if (!match) {
                        console.error('[authenticateUser] ❌ Incorrect password');
                        throw new CredentialsError('wrong credentials');
                    }

                    return {
                        _id: user._id.toString(),
                        role: user.role // 🔹 Aseguramos que `role` se devuelva
                    };
                });
        })
        .catch(error => {
            console.error('[authenticateUser] ❌ Error:', error.message);
            throw new SystemError(error.message);
        });
};

export default authenticateUser;
