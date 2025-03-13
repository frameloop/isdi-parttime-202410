import { User } from '../data/models.js';
import { validate, errors } from 'com';
import bcrypt from 'bcryptjs';

const { DuplicityError, SystemError } = errors;

const registerUser = (name, email, phone, username, password, role) => {
    console.log(`[registerUser] Request received with username: ${username}, role: ${role}`);

    try {
        validate.name(name);
        validate.email(email);
        validate.phone(phone);
        validate.username(username);
        validate.password(password);
        console.log(`[registerUser] All input validations passed for: ${username}`);
    } catch (error) {
        console.error(`[registerUser] Validation error: ${error.message}`);
        return Promise.reject(new SystemError(error.message));
    }

    return bcrypt.hash(password, 10)
        .then(hash => {
            console.log(`[registerUser] Password hashed successfully for: ${username}`);

            const user = new User({ name, email, phone, username, password: hash, role });
            console.log(`[registerUser] Creating new user: ${username}`);

            return user.save();
        })
        .catch(error => {
            if (error.code === 11000) {
                console.warn(`[registerUser] Duplicate user found: ${username}`);
                throw new DuplicityError('User already exists');
            }

            console.error(`[registerUser] Database error: ${error.message}`);
            throw new SystemError(error.message);
        })
        .then(user => {
            console.log(`[registerUser] User registered successfully: ${username}`);
            return user;
        });
};

export default registerUser;
