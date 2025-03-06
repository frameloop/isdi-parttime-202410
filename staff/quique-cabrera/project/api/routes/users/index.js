import { Router } from 'express';
import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    verifyUserHandler,
    logoutUserHandler,
    recoverPasswordHandler
} from './handlers/index.js';

import jsonBodyParser from '../../middlewares/jsonBodyParser.js';
import authMiddleware from '../../middlewares/authMiddleware.js'; // 🔹 Importamos el middleware de autenticación

const router = new Router();

// 📌 Rutas de autenticación
router.post('/register', jsonBodyParser, registerUserHandler);
router.post('/auth', jsonBodyParser, authenticateUserHandler);

// 📌 Rutas protegidas (requieren autenticación)
router.get('/profile', authMiddleware, getUserNameHandler);
router.post('/logout', authMiddleware, logoutUserHandler);

// 📌 Verificación de usuario (no requiere autenticación)
router.post('/verify', jsonBodyParser, verifyUserHandler);

router.get('/me', authMiddleware, getUserNameHandler);

// router.post('/recover-password', jsonBodyParser, recoverPasswordHandler);
router.post('/recover-password', recoverPasswordHandler)

export default router;
