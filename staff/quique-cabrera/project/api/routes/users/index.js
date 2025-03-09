import { Router } from 'express'; // Importa el enrutador de Express para definir rutas
import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    verifyUserHandler,
    logoutUserHandler,
    recoverPasswordHandler
} from './handlers/index.js'; // Importa los handlers de las rutas

import { User } from '../../data/models.js'; // 🔹 Asegúrate de importar el modelo User para interactuar con la base de datos
import jsonBodyParser from '../../middlewares/jsonBodyParser.js'; // Middleware para parsear el cuerpo de las solicitudes en formato JSON

import authMiddleware from '../../middlewares/authMiddleware.js'; // 🔹 Middleware de autenticación para rutas protegidas
import logoutUser from '../../logic/logoutUser.js'; // Asegúrate que la ruta sea correcta, importa la lógica de logout

const router = new Router(); // Crea una nueva instancia del enrutador

// 📌 Rutas de autenticación
console.log("📍 Configurando rutas de autenticación");
router.post('/register', jsonBodyParser, registerUserHandler); // Ruta para registrar un nuevo usuario
console.log("✅ Ruta /register configurada con jsonBodyParser y registerUserHandler");
router.post('/auth', jsonBodyParser, authenticateUserHandler); // Ruta para autenticar un usuario
console.log("✅ Ruta /auth configurada con jsonBodyParser y authenticateUserHandler");

// 📌 Rutas protegidas (requieren autenticación)
console.log("📍 Configurando rutas protegidas");
router.get('/profile', authMiddleware, getUserNameHandler); // Ruta para obtener el perfil del usuario autenticado
console.log("✅ Ruta /profile configurada con authMiddleware y getUserNameHandler");

// 🛑 Asegurar que el middleware está antes de logoutUser
console.log("📍 Configurando ruta de logout protegida");
router.post('/logout', authMiddleware, logoutUser); // Ruta para cerrar sesión (usando la lógica logoutUser)
console.log("✅ Ruta /logout configurada con authMiddleware y logoutUser");

// 📌 Verificación de usuario (no requiere autenticación)
console.log("📍 Configurando ruta de verificación");
router.post('/verify', jsonBodyParser, verifyUserHandler); // Ruta para verificar si un usuario existe
console.log("✅ Ruta /verify configurada con jsonBodyParser y verifyUserHandler");

router.get('/me', authMiddleware, getUserNameHandler); // Ruta para obtener datos del usuario autenticado
console.log("✅ Ruta /me configurada con authMiddleware y getUserNameHandler");

// 📌 Recuperación de contraseña
console.log("📍 Configurando ruta de recuperación de contraseña");
router.post('/recover-password', recoverPasswordHandler); // Ruta para enviar correo de recuperación
console.log("✅ Ruta /recover-password configurada con recoverPasswordHandler");

// 📌 Rutas para obtener customers y photographers
console.log("📍 Configurando rutas para obtener customers y photographers");
router.get('/customers', async (req, res) => {
    console.log("🔍 Solicitud para obtener lista de customers");
    try {
        const customers = await User.find({ role: 'customer' });
        console.log(`✅ Customers encontrados: ${customers.length} usuarios`);
        res.json(customers);
    } catch (error) {
        console.error("🚨 Error al obtener customers:", error);
        console.log(`❌ Detalle del error: ${error.message}`);
        res.status(500).json({ error: 'Error fetching customers' });
    }
});

router.get('/photographers', async (req, res) => {
    console.log("🔍 Solicitud para obtener lista de photographers");
    try {
        const photographers = await User.find({ role: 'photographer' });
        console.log(`✅ Photographers encontrados: ${photographers.length} usuarios`);
        res.json(photographers);
    } catch (error) {
        console.error("🚨 Error al obtener photographers:", error);
        console.log(`❌ Detalle del error: ${error.message}`);
        res.status(500).json({ error: 'Error fetching photographers' });
    }
});

console.log("✅ Todas las rutas configuradas correctamente");
export default router;