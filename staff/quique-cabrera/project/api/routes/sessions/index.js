import express from 'express'
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
} from './handlers/index.js'

import authMiddleware from '../../middlewares/authMiddleware.js'
import { authenticateToken } from '../../middlewares/auth.js'

const router = express.Router()

// Sesiones
router.get('/', getSessions)
router.post('/', authMiddleware, createSession); // 🔥 ESTA LÍNEA ES CLAVE
router.delete('/:sessionId', authMiddleware, deleteSession)

// Sesiones de usuario autenticado
router.get('/my-sessions', authenticateToken, getUserSessions)

// Sesiones del fotógrafo autenticado
router.get('/photographers/sessions', authMiddleware, getPhotographerSessions)

// Disponibilidad
router.get('/availability', authMiddleware, getAllAvailability)
router.get('/availability/:photographerId', authMiddleware, getAvailability)
router.post('/availability', authMiddleware, createAvailability)
router.put('/availability/:id', authMiddleware, updateAvailability)
router.delete('/availability/:id', authMiddleware, deleteAvailability)

export default router
