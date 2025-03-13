import express from 'express';
import {
    createSession,
    getSessions,
    updateSession,
    deleteSession,
    getUserSessions,
    getAvailability,
    createAvailability,
    getPhotographerSessions,
    getAllAvailability
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

router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

export default router;
