import { Router } from 'express';
import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    verifyUserHandler,
    logoutUserHandler,
    recoverPasswordHandler
} from './handlers/index.js';

import { User } from '../../data/models.js'; // 🔹 Asegúrate de importar el modelo User

import jsonBodyParser from '../../middlewares/jsonBodyParser.js';

import authMiddleware from '../../middlewares/authMiddleware.js'; // 🔹 Middleware de autenticación

import logoutUser from '../../logic/logoutUser.js';  // Asegúrate que la ruta sea correcta


const router = new Router();

// 📌 Rutas de autenticación
router.post('/register', jsonBodyParser, registerUserHandler);
router.post('/auth', jsonBodyParser, authenticateUserHandler);

// 📌 Rutas protegidas (requieren autenticación)
router.get('/profile', authMiddleware, getUserNameHandler);

// 🛑 Asegurar que el middleware está antes de logoutUser
router.post('/logout', authMiddleware, logoutUser);


// 📌 Verificación de usuario (no requiere autenticación)
router.post('/verify', jsonBodyParser, verifyUserHandler);

router.get('/me', authMiddleware, getUserNameHandler);

// 📌 Recuperación de contraseña
router.post('/recover-password', recoverPasswordHandler);

// 📌 Rutas para obtener customers y photographers
router.get('/customers', async (req, res) => {
    try {
        const customers = await User.find({ role: 'customer' });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customers' });
    }
});

router.get('/photographers', async (req, res) => {
    try {
        const photographers = await User.find({ role: 'photographer' });
        res.json(photographers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching photographers' });
    }
});

export default router;
