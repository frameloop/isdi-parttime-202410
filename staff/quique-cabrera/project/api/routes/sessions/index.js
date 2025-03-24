import express from 'express';
import {
    createSession,
    getSessions,
    getUserSessions,
    getAvailability,
    createAvailability,
    getPhotographerSessions,
    getAllAvailability,
    updateAvailability,
    deleteAvailability,
    deleteSession
} from './handlers/index.js';

import authMiddleware from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getSessions);
router.get('/user', authMiddleware, getUserSessions);
router.get('/availability/:photographerId', authMiddleware, getAvailability);
router.get('/my-sessions', authMiddleware, getUserSessions);
router.get('/photographers/sessions', authMiddleware, getPhotographerSessions);
router.get('/customers/sessions', authMiddleware, getUserSessions);
router.get('/availability', authMiddleware, getAllAvailability);

router.post('/availability', authMiddleware, createAvailability);
router.post('/', createSession);
router.delete('/:sessionId', authMiddleware, deleteSession);

router.put('/availability/:id', authMiddleware, updateAvailability); // 🔧 nueva
router.delete('/availability/:id', authMiddleware, deleteAvailability); // 🗑️ nueva

export default router;
