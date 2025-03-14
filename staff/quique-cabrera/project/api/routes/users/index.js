import { Router } from 'express';
import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    verifyUserHandler,
    logoutUserHandler,
    recoverPasswordHandler,
    getAllPhotographers
} from './handlers/index.js';

import { Photographer, User } from '../../data/models.js';
import jsonBodyParser from '../../middlewares/jsonBodyParser.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import logic from '../../logic/index.js';

const router = new Router();

console.log("📌 Configurando rutas de autenticación...");
router.post('/register', jsonBodyParser, registerUserHandler);
router.post('/auth', jsonBodyParser, authenticateUserHandler);

console.log("🔒 Configurando rutas protegidas...");
router.get('/profile', authMiddleware, getUserNameHandler);
router.post('/logout', authMiddleware, logoutUserHandler);
router.get('/me', authMiddleware, getUserNameHandler);

console.log("🔍 Configurando ruta de verificación...");
router.post('/verify', jsonBodyParser, verifyUserHandler);

console.log("📧 Configurando ruta de recuperación de contraseña...");
router.post('/recover-password', recoverPasswordHandler);

console.log("📸 Configurando rutas de fotógrafos...");

// ✅ **Ruta para obtener todos los fotógrafos**
router.get('/photographers', getAllPhotographers);

// ✅ **Ruta para registrar fotógrafos**
router.post('/photographers', authMiddleware, async (req, res, next) => {
    try {
        const { name, email, phone, username, password, coverage_area } = req.body;

        console.log(`[registerPhotographer] 📸 Recibiendo datos para fotógrafo: ${username}`);

        // Registrar el usuario como fotógrafo
        const newUser = await logic.registerUser(name, email, phone, username, password, 'photographer', coverage_area);

        // Crear el perfil del fotógrafo vinculado al usuario
        const photographer = new Photographer({
            user: newUser._id,
            coverage_area: coverage_area,
            sessions: []
        });

        await photographer.save();

        console.log(`[registerPhotographer] ✅ Fotógrafo registrado: ${username}`);
        res.status(201).json({ success: true, message: 'Photographer registered successfully', photographer });
    } catch (error) {
        console.error(`[registerPhotographer] ❌ Error registrando fotógrafo:`, error);
        next(error);
    }
});

console.log("✅ Todas las rutas han sido configuradas correctamente.");
export default router;
