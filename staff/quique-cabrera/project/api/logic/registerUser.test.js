import 'dotenv/config';
import mongoose from 'mongoose';
import registerUser from './registerUser.js';
import { User } from '../data/models.js'; // 📌 Importamos el modelo para manipular la BD directamente

// 🔌 Conexión a la base de datos de pruebas
mongoose.connect(process.env.TEST_MONGO_URL)
    .then(() => {
        console.log('✅ MongoDB connection OK'); // 📌 Confirmamos que la conexión se ha establecido correctamente

        // 🗑️ Eliminamos el usuario si ya existe para evitar errores de duplicidad
        return User.deleteOne({ username: 'acme' });
    })
    .then(result => {
        if (result.deletedCount > 0) {
            console.log('🗑️ Deleted existing user "acme" before test'); // 📌 Usuario eliminado correctamente antes de la prueba
        } else {
            console.log('ℹ️ No existing user "acme" found, skipping deletion'); // 📌 No se encontró el usuario, no es necesario eliminarlo
        }

        // 🛠️ Datos del usuario a registrar
        const name = 'Con PinPon';
        const email = 'pin@pon.es';
        const phone = '555555555';
        const username = 'pinpon';
        const password = 'A3x9zLp8Q1';
        const role = 'administrator';

        console.log(`🔍 Trying to register user: ${name}, ${email}, ${phone}, ${username}, ${password}, ${role}`);

        // 📌 Intentamos registrar al usuario
        return registerUser(name, email, phone, username, password, role);
    })
    .then(result => {
        console.log('✅ User registered successfully:', result); // 📌 Usuario registrado correctamente
    })
    .catch(error => {
        if (error.name === 'DuplicityError') {
            console.warn('⚠ User already exists, skipping registration'); // ⚠ Si el usuario ya existía, lo indicamos
        } else {
            console.error('❌ Unexpected error in registerUser:', error); // 🚨 Si hay un error inesperado
        }
    })
    .finally(() => {
        console.log('🔌 Closing MongoDB connection...'); // 📌 Indicamos que se está cerrando la conexión
        mongoose.connection.close()
            .then(() => console.log('✅ MongoDB connection closed'))
            .catch(error => console.error('❌ Error closing MongoDB connection:', error));
    });
