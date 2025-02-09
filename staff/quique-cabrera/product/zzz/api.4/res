import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import logic from './logic/index.js'

const PORT = 8080

const connectToDb = () => mongoose.connect('mongodb://localhost:27017/test').then(() => console.log('DB connected'))

const startApi = () => {
    const api = express()

    const jsonBodyParser = express.json()

    api.use(cors())

    api.get('/', (req, res) => res.send('Hello, API!'))

    api.post('/users', jsonBodyParser, (req, res) => {
        try {
            const { name, email, username, password } = req.body

            logic.registerUser(name, email, username, password)
                .then(() => res.status(201).send())
                .catch(error => res.status(400).json({ error: error.constructor.name, message: error.message }))
        } catch (error) {
            res.status(400).json({ error: error.constructor.name, message: error.message })
        }
    })

    api.post('/users/auth', jsonBodyParser, (req, res) => {
        try {
            const { username, password } = req.body

            logic.authenticateUser(username, password)
                .then(userId => res.json(userId))
                .catch(error => res.status(400).json({ error: error.constructor.name, message: error.message }))
        } catch (error) {
            res.status(400).json({ error: error.constructor.name, message: error.message })
        }
    })

    api.get('/users', (req, res) => {
        try {
            const userId = req.headers.authorization.slice(6) // Basic abc123

            logic.getUserName(userId)
                .then(name => res.json(name))
                .catch(error => res.status(400).json({ error: error.constructor.name, message: error.message }))
        } catch (error) {
            res.status(400).json({ error: error.constructor.name, message: error.message })
        }
    })

    api.get('/posts', (req, res) => {
        try {
            const userId = req.headers.authorization.slice(6) // Basic abc123

            logic.getPosts(userId)
                .then(posts => res.json(posts))
                .catch(error => res.status(400).json({ error: error.constructor.name, message: error.message }))
        } catch (error) {
            res.status(400).json({ error: error.constructor.name, message: error.message })
        }

    })

    api.post('/posts', jsonBodyParser, (req, res) => {
        try {
            const userId = req.headers.authorization.slice(6) // Basic abc123

            const { image, text } = req.body

            logic.createPost(userId, image, text)
                .then(() => res.status(201).send())
                .catch(error => res.status(400).json({ error: error.constructor.name, message: error.message }))
        } catch (error) {
            res.status(400).json({ error: error.constructor.name, message: error.message })
        }
    })

    api.delete('/posts/:postId', jsonBodyParser, (req, res) => {
        try {
            const userId = req.headers.authorization.slice(6) // Basic abc123

            const { postId } = req.params

            logic.deletePost(userId, postId)
                .then(() => res.status(204).send())
                .catch(error => res.status(400).json({ error: error.constructor.name, message: error.message }))
        } catch (error) {
            res.status(400).json({ error: error.constructor.name, message: error.message })
        }
    })

    api.listen(PORT, () => console.log(`API running on port ${PORT}`))
}

connectToDb()
    .then(() => startApi())
    .catch(error => console.error(error))