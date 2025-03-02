import logic from '../../../logic/index.js'
import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7) // Bearer token

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        const { sub: userId } = payload

        logic.getPosts(userId)
            .then(posts => res.json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }

}