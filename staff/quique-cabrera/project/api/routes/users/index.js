import express from 'express'
import {
    registerUserHandler,
    loginUserHandler, // ✅ nuevo handler
    verifyUserHandler,
    logoutUserHandler,
    recoverPasswordHandler,
    getAllPhotographers,
    deletePhotographer
} from './handlers/index.js'

import jsonBodyParser from '../../middlewares/jsonBodyParser.js'
import authMiddleware from '../../middlewares/authMiddleware.js'

const router = express.Router()

// Registro y login
router.post('/register', jsonBodyParser, registerUserHandler)
router.post('/login', jsonBodyParser, loginUserHandler) // ✅ login unificado

// Info de usuario autenticado
router.get('/me', authMiddleware, (req, res) => {
    const { _id, name, email, role } = req.user
    res.status(200).json({ _id, name, email, role })
})
router.get('/profile', authMiddleware, (req, res) => res.json({ user: req.user })) // opcional, puedes fusionarla o eliminarla

// Verificación, logout y recuperación
router.get('/verify', (req, res) => res.json({ message: 'Email verified successfully' }))
router.post('/verify', jsonBodyParser, verifyUserHandler)
router.post('/logout', authMiddleware, logoutUserHandler)
router.post('/recover-password', recoverPasswordHandler)

// Gestión de fotógrafos
router.get('/photographers', authMiddleware, getAllPhotographers);
router.post('/photographers', jsonBodyParser, (req, res, next) => {
    req.body.role = 'photographer'
    registerUserHandler(req, res, next)
})
router.delete('/photographers/:id', authMiddleware, deletePhotographer)

export default router
