import { User } from '../data/models.js'; // 📌 Importamos el modelo de usuario
import { validate, errors } from 'com'; // 📌 Librería para validaciones y manejo de errores
import bcrypt from 'bcryptjs'; // 📌 Librería para el hashing de contraseñas

const { DuplicityError, SystemError } = errors; // Extraemos los tipos de errores personalizados

/**
 * 📝 Registra un nuevo usuario en la base de datos.
 * @param {string} name - Nombre del usuario
 * @param {string} email - Correo electrónico del usuario
 * @param {string} phone - Número de teléfono del usuario
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña en texto plano (se encriptará)
 * @param {string} role - Rol del usuario (customer, photographer, administrator)
 * @returns {Promise<User>} - Devuelve el usuario creado si el registro es exitoso.
 * @throws {DuplicityError} - Si el usuario ya existe.
 * @throws {SystemError} - Si ocurre un error inesperado.
 */
const registerUser = (name, email, phone, username, password, role) => {
    console.log(`🟢 [registerUser] Request received with username: ${username}, role: ${role}`);

    try {
        // 🔍 Validamos los datos antes de procesarlos
        validate.name(name);
        validate.email(email);
        validate.phone(phone);
        validate.username(username);
        validate.password(password);
        console.log(`✅ [registerUser] All input validations passed for: ${username}`);
    } catch (error) {
        console.error(`❌ [registerUser] Validation error: ${error.message}`);
        return Promise.reject(new SystemError(error.message));
    }

    // 🔐 Hasheamos la contraseña antes de guardarla
    return bcrypt.hash(password, 10)
        .then(hash => {
            console.log(`🔑 [registerUser] Password hashed successfully for: ${username}`);

            // 📌 Creamos un nuevo usuario con los datos proporcionados
            const user = new User({ name, email, phone, username, password: hash, role });
            console.log(`🆕 [registerUser] Creating new user: ${username}`);

            // 💾 Guardamos el usuario en la base de datos
            return user.save();
        })
        .catch(error => {
            if (error.code === 11000) { // 🚨 Código 11000 indica duplicidad en MongoDB
                console.warn(`⚠ [registerUser] Duplicate user found: ${username}`);
                throw new DuplicityError('User already exists');
            }

            console.error(`❌ [registerUser] Database error: ${error.message}`);
            throw new SystemError(error.message);
        })
        .then(user => {
            console.log(`✅ [registerUser] User registered successfully: ${username}`);
            return user; // 📌 Retornamos el usuario creado
        });
};

export default registerUser;
