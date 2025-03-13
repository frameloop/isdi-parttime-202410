import { Router } from 'express';
import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    verifyUserHandler,
    logoutUserHandler,
    recoverPasswordHandler
} from './handlers/index.js';

import { User } from '../../data/models.js';
import jsonBodyParser from '../../middlewares/jsonBodyParser.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import logoutUser from '../../logic/logoutUser.js';

const router = new Router();

console.log("Configurando rutas de autenticación");
router.post('/register', jsonBodyParser, registerUserHandler);
router.post('/auth', jsonBodyParser, authenticateUserHandler);

console.log("Configurando rutas protegidas");
router.get('/profile', authMiddleware, getUserNameHandler);
router.post('/logout', authMiddleware, logoutUser);
router.get('/me', authMiddleware, getUserNameHandler);

console.log("Configurando ruta de verificación");
router.post('/verify', jsonBodyParser, verifyUserHandler);

console.log("Configurando ruta de recuperación de contraseña");
router.post('/recover-password', recoverPasswordHandler);

console.log("Configurando rutas para obtener customers y photographers");
router.get('/customers', async (req, res) => {
    try {
        const customers = await User.find({ role: 'customer' });
        res.json(customers);
    } catch (error) {
        console.error("Error al obtener customers:", error);
        res.status(500).json({ error: 'Error fetching customers' });
    }
});

router.get('/photographers', async (req, res) => {
    try {
        const photographers = await User.find({ role: 'photographer' });
        res.json(photographers);
    } catch (error) {
        console.error("Error al obtener photographers:", error);
        res.status(500).json({ error: 'Error fetching photographers' });
    }
});

console.log("Todas las rutas configuradas correctamente");
export default router;