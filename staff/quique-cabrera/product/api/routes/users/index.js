import { Router } from 'express'
import { registerUserHandler, authenticateUserHandler, getUserNameHandler } from './handlers/index.js'
import jsonBodyParser from '../../middlewares/jsonBodyParser.js'

const router = new Router()

router.post('/', jsonBodyParser, registerUserHandler)

router.post('/auth', jsonBodyParser, authenticateUserHandler)

router.get('/', getUserNameHandler)

export default router