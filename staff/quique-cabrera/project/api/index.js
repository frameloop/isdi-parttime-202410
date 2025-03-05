import 'dotenv/config'

import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import { usersRouter } from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'

const connectToDb = () => mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB connected'))

const startApi = () => {
    const api = express()

    api.use(cors())

    api.get('/', (req, res) => res.send('Hello, APIO!'))

    api.use('/users', usersRouter)

    api.use(errorHandler)

    api.listen(process.env.PORT, () => console.log(`API running on port ${process.env.PORT}`))
}

connectToDb()
    .then(() =>
        startApi()
    )
    .catch(error => console.error(error))