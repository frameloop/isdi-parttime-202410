import logic from '../../../logic/index.js'

export default (req, res, next) => {
    try {
        const { name, email, phone, username, password, role } = req.body

        logic.registerUser(name, email, phone, username, password, role)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}