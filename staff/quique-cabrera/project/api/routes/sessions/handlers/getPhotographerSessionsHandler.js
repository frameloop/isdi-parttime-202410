import logic from '../../../logic/index.js'
import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "AuthorizationError", message: "Missing token" });
        }

        const token = req.headers.authorization.slice(7);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { sub: userId } = payload; // Obtiene el ID del usuario autenticado

        logic.getPhotographerSessions(userId)
            .then(sessions => res.json(sessions))
            .catch(error => next(error));

    } catch (error) {
        next(error);
    }
};
