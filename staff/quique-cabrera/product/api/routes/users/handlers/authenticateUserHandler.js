import logic from '../../../logic/index.js'
import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    try {
        const { username, password } = req.body

        logic.authenticateUser(username, password)
            .then(userId => {
                // res.json(userId)

                const payload = { sub: userId }

                const token = jwt.sign(payload, process.env.JWT_SECRET)

                res.json(token)
            })
            .catch(error => error => next(error))

    } catch (error) {
        next(error)
    }
}