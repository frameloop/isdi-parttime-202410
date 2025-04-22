import express from 'express'
import {
    registerUserHandler,
    loginUserHandler,
    verifyUserHandler,
    logoutUserHandler,
    recoverPasswordHandler,
    getAllPhotographers,
    deletePhotographer
} from './handlers/index.js'

import jsonBodyParser from '../../middlewares/jsonBodyParser.js'
import authMiddleware from '../../middlewares/authMiddleware.js'
import { getPhotographer } from './handlers/getPhotographerHandler.js'
import logic from '../../logic/index.js'

const router = express.Router()

// Registro y login
router.post('/register', jsonBodyParser, registerUserHandler)
router.post('/login', jsonBodyParser, loginUserHandler)

// Info de usuario autenticado (Requieren token)
router.get('/me', authMiddleware, async (req, res, next) => {
    try {
        const user = await logic.verifyUserLogic(req.userId)
        res.json(user)
    } catch (error) {
        next(error)
    }
})

router.get('/profile', authMiddleware, async (req, res, next) => {
    try {
        const user = await logic.verifyUserLogic(req.userId)
        res.json(user)
    } catch (error) {
        next(error)
    }
})

// Verificación de existencia de username (NO requiere token)
// router.get('/verify', (req, res) => res.json({ message: 'Email verified successfully' })) // Probablemente obsoleto/para email
router.post('/verify-username', jsonBodyParser, verifyUserHandler) // Renombrar endpoint y handler si se ajusta lógica
// Quitado authMiddleware de esta ruta

// Logout y recuperación (Logout requiere token, recover no)
router.post('/logout', authMiddleware, logoutUserHandler)
router.post('/recover-password', jsonBodyParser, recoverPasswordHandler)

// Gestión de fotógrafos (Requieren token y rol adecuado, verificar en handlers/logic)
router.get('/photographers', authMiddleware, getAllPhotographers)
router.post('/photographers', jsonBodyParser, authMiddleware, (req, res, next) => {
    req.body.role = 'photographer'
    registerUserHandler(req, res, next)
})
router.delete('/photographers/:id', authMiddleware, deletePhotographer) // Añadir middleware para verificar rol admin?

// Ruta para obtener datos del fotógrafo por userId
router.get('/photographer/:userId', authMiddleware, getPhotographer)

export default router
