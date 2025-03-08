import express from 'express';
import { createSession, getSessions, updateSession, deleteSession, getUserSessions } from './handlers/index.js';
import authMiddleware from '../../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', createSession);
router.get('/user', authMiddleware, getUserSessions); // 🛑 Asegúrate de que authMiddleware está aquí
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

// 📌 Endpoint para obtener sesiones del usuario autenticado
router.get('/my-sessions', authMiddleware, getUserSessions)

export default router;
