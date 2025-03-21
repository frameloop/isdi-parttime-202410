import express from 'express';
import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    verifyUserHandler,
    logoutUserHandler,
    recoverPasswordHandler,
    getAllPhotographers,
    deletePhotographer
} from './handlers/index.js';

import { Photographer, User } from '../../data/models.js';
import jsonBodyParser from '../../middlewares/jsonBodyParser.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import logic from '../../logic/index.js';

const router = express.Router();

console.log("📝 Configurando rutas de autenticación...");
router.post('/register', jsonBodyParser, registerUserHandler);
router.post('/auth', jsonBodyParser, authenticateUserHandler);

console.log("🔒 Configurando rutas protegidas...");
router.get('/profile', authMiddleware, (req, res) => res.json({ user: req.user }));
router.post('/logout', authMiddleware, logoutUserHandler);
router.get('/me', authMiddleware, getUserNameHandler);

console.log("🔍 Configurando ruta de verificación...");
router.get('/verify', (req, res) => res.json({ message: 'Email verified successfully' }));
router.post('/verify', jsonBodyParser, verifyUserHandler);

console.log("📧 Configurando ruta de recuperación de contraseña...");
router.post('/recover-password', (req, res) => res.json({ message: 'Password recovery email sent' }));
router.post('/recover-password', recoverPasswordHandler);

console.log("📸 Configurando rutas de fotógrafos...");

// ✅ **Ruta para obtener todos los fotógrafos**
router.get('/photographers', getAllPhotographers);

// ✅ **Ruta para registrar fotógrafos**
router.post('/photographers', jsonBodyParser, (req, res, next) => {
    req.body.role = 'photographer';
    registerUserHandler(req, res, next);
});

router.delete('/photographers/:id', deletePhotographer);

console.log("✅ Todas las rutas han sido configuradas correctamente.");
export default router;
