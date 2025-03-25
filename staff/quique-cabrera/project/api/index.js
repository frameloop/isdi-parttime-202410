import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import { usersRouter, sessionsRouter } from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'

const connectToDb = () => mongoose.connect(process.env.MONGO_URL)

const startApi = () => {
    const api = express()

    // Middlewares
    api.use(cors())
    api.use(express.json())

    // Ruta base
    api.get('/', (req, res) => res.send('API en funcionamiento 🚀'))

    // Rutas principales
    api.use('/users', usersRouter)
    api.use('/sessions', sessionsRouter)

    // Manejo de errores
    api.use(errorHandler)

    // Iniciar servidor
    api.listen(process.env.PORT, () => {
        console.log(`✅ API corriendo en http://localhost:${process.env.PORT}`)
    })
}

// Conectar y lanzar
connectToDb()
    .then(startApi)
    .catch(error => {
        console.error('❌ Error conectando a la base de datos:', error)
    })
