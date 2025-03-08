import { User } from '../data/models.js'; // 📌 Importamos el modelo de usuario desde la base de datos
import { validate, errors } from 'com'; // 📌 Librería para validaciones y manejo de errores

const { SystemError, NotFoundError } = errors; // Extraemos los tipos de errores personalizados

/**
 * 🔄 Función para recuperar la contraseña de un usuario utilizando `then/catch`.
 * @param {string} username - Nombre de usuario para buscar en la base de datos.
 * @returns {Promise<boolean>} - Devuelve `true` si se envía el email correctamente.
 * @throws {SystemError} - Si hay un error con la base de datos.
 * @throws {NotFoundError} - Si el usuario no existe.
 */
const recoverPassword = (username) => {
    console.log(`🟢 [RecoverPassword] Request received for username: ${username}`);

    try {
        // 📌 Validamos el formato del nombre de usuario antes de procesarlo
        validate.username(username);
        console.log(`✅ [RecoverPassword] Username validated: ${username}`);
    } catch (error) {
        console.error(`❌ [RecoverPassword] Invalid username format: ${error.message}`);
        return Promise.reject(new SystemError(error.message));
    }

    // 🔍 Buscamos al usuario en la base de datos con `then/catch`
    return User.findOne({ username })
        .then((user) => {
            if (!user) {
                console.warn(`⚠ [RecoverPassword] User not found: ${username}`);
                throw new NotFoundError('User not found'); // 🚨 Lanzamos error si el usuario no existe
            }

            console.log(`🟢 [RecoverPassword] User found: ${username} | Email: ${user.email}`);

            // 📧 Simulación de envío de correo de recuperación de contraseña
            console.log(`📧 [RecoverPassword] Sending recovery email to: ${user.email}`);

            return true; // ✅ Confirmamos que el email se "envió" correctamente
        })
        .catch((error) => {
            console.error(`❌ [RecoverPassword] Error during password recovery: ${error.message}`);
            throw new SystemError(error.message); // 🚨 Relanzamos el error como un SystemError
        });
};

export default recoverPassword;
