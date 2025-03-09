import { User } from '../data/models.js';
import { validate, errors } from 'com';
import bcrypt from 'bcryptjs';

const { SystemError, CredentialsError } = errors;

/**
 * 🔐 Autenticar usuario mediante credenciales
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña
 * @returns {Promise<string>} - Devuelve el ID del usuario autenticado
 */
const authenticateUser = (username, password) => {
    console.log('🔍 [authenticateUser] Received:', username, password);

    // ✅ Validación de entrada
    validate.username(username);
    validate.password(password);

    // 🔎 Buscar usuario en la base de datos
    return User.findOne({ username }).select('+password')
        .then(user => {
            if (!user) {
                console.error('❌ [authenticateUser] User not found:', username);
                throw new CredentialsError('user: wrong credentials');
            }

            console.log('🟢 [authenticateUser] Found user:', user.username);
            console.log('🔍 [authenticateUser] Stored Hashed Password:', user.password || '❌ NOT FOUND');

            if (!user.password) {
                console.error('❌ [authenticateUser] Password is missing from DB');
                throw new SystemError('Invalid user data: password is missing');
            }

            // 🔑 Comparar contraseñas
            return bcrypt.compare(password, user.password)
                .then(match => {
                    console.log('🔍 [authenticateUser] Password match:', match);

                    if (!match) {
                        console.error('❌ [authenticateUser] Incorrect password');
                        throw new CredentialsError('wrong credentials');
                    }

                    return user._id.toString();
                });
        })
        .catch(error => {
            console.error('❌ [authenticateUser] Error:', error.message);
            throw new SystemError(error.message);
        });
};

export default authenticateUser;
