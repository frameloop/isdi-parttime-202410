import 'dotenv/config'

import mongoose from 'mongoose'

import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import logic from './logic/index.js'
import errors from './logic/errors/index.js'

const { ValidationError, SystemError, DuplicityError, CredentialsError, NotFoundError } = errors

const connectToDb = () => mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB connected'))

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
                .catch(error => {
                    if (error instanceof DuplicityError)
                        res.status(409).json({ error: error.constructor.name, message: error.message })
                    else if (error instanceof SystemError)
                        res.status(500).json({ error: error.constructor.name, message: error.message })
                    else
                        res.status(500).json({ error: SystemError.name, message: error.message })

                })
        } catch (error) {
            if (error instanceof ValidationError)
                res.status(400).json({ error: error.constructor.name, message: error.message })
            else
                res.status(500).json({ error: SystemError.name, message: error.message })
        }
    })

    api.post('/users/auth', jsonBodyParser, (req, res) => {
        try {
            const { username, password } = req.body

            logic.authenticateUser(username, password)
                .then(userId => {
                    // res.json(userId)

                    const payload = { sub: userId }

                    const token = jwt.sign(payload, process.env.JWT_SECRET)

                    res.json(token)
                })
                .catch(error => {
                    if (error instanceof CredentialsError)
                        res.status(401).json({ error: error.constructor.name, message: error.message })
                    else if (error instanceof SystemError)
                        res.status(500).json({ error: error.constructor.name, message: error.message })
                    else
                        res.status(500).json({ error: SystemError.name, message: error.message })
                })

        } catch (error) {
            if (error instanceof ValidationError)
                res.status(400).json({ error: error.constructor.name, message: error.message })
            else
                res.status(500).json({ error: SystemError.name, message: error.message })
        }
    })

    api.get('/users', (req, res) => {
        try {
            const token = req.headers.authorization.slice(7) // Bearer token

            const payload = jwt.verify(token, process.env.JWT_SECRET)

            const { sub: userId } = payload

            logic.getUserName(userId)
                .then(name => res.json(name))
                .catch(error => {
                    if (error instanceof NotFoundError)
                        res.status(404).json({ error: error.constructor.name, message: error.message })
                    else if (error instanceof SystemError)
                        res.status(500).json({ error: error.constructor.name, message: error.message })
                    else
                        res.status(500).json({ error: SystemError.name, message: error.message })
                })

        } catch (error) {
            if (error instanceof ValidationError)
                res.status(400).json({ error: error.constructor.name, message: error.message })
            else
                res.status(500).json({ error: SystemError.name, message: error.message })
        }
    })

    api.get('/posts', (req, res) => {
        try {
            const token = req.headers.authorization.slice(7) // Bearer token

            const payload = jwt.verify(token, process.env.JWT_SECRET)

            const { sub: userId } = payload

            logic.getPosts(userId)
                .then(posts => res.json(posts))
                .catch(error => {
                    if (error instanceof NotFoundError)
                        res.status(404).json({ error: error.constructor.name, message: error.message })
                    else if (error instanceof SystemError)
                        res.status(500).json({ error: error.constructor.name, message: error.message })
                    else
                        res.status(500).json({ error: SystemError.name, message: error.message })
                })

        } catch (error) {
            if (error instanceof ValidationError)
                res.status(400).json({ error: error.constructor.name, message: error.message })
            else
                res.status(500).json({ error: SystemError.name, message: error.message })
        }
    })

    api.post('/posts', jsonBodyParser, (req, res) => {
        try {
            const token = req.headers.authorization.slice(7) // Bearer token

            const payload = jwt.verify(token, process.env.JWT_SECRET)

            const { sub: userId } = payload

            const { image, text } = req.body

            logic.createPost(userId, image, text)
                .then(() => res.status(201).send())
                .catch(error => {
                    if (error instanceof NotFoundError)
                        res.status(404).json({ error: error.constructor.name, message: error.message })
                    else if (error instanceof SystemError)
                        res.status(500).json({ error: error.constructor.name, message: error.message })
                    else
                        res.status(500).json({ error: SystemError.name, message: error.message })
                })
        } catch (error) {
            if (error instanceof ValidationError)
                res.status(400).json({ error: error.constructor.name, message: error.message })
            else
                res.status(500).json({ error: SystemError.name, message: error.message })
        }
    })

    api.delete('/posts/:postId', jsonBodyParser, (req, res) => {
        try {
            const token = req.headers.authorization.slice(7) // Bearer token

            const payload = jwt.verify(token, process.env.JWT_SECRET)

            const { sub: userId } = payload

            const { postId } = req.params

            logic.deletePost(userId, postId)
                .then(() => res.status(204).send())
                .catch(error => {
                    if (error instanceof NotFoundError)
                        res.status(404).json({ error: error.constructor.name, message: error.message })
                    else if (error instanceof SystemError)
                        res.status(500).json({ error: error.constructor.name, message: error.message })
                    else
                        res.status(500).json({ error: SystemError.name, message: error.message })
                })
        } catch (error) {
            if (error instanceof ValidationError)
                res.status(400).json({ error: error.constructor.name, message: error.message })
            else
                res.status(500).json({ error: SystemError.name, message: error.message })
        }
    })

    api.listen(process.env.PORT, () => console.log(`API running on port ${process.env.PORT}`))
}

connectToDb()
    .then(() => startApi())
    .catch(error => console.error(error))
