import logic from '../../../logic/index.js'
import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    try {
        const { username, password } = req.body;

        logic.authenticateUser(username, password)
            .then(userId => {
                const payload = { sub: userId };

                const token = jwt.sign(payload, process.env.JWT_SECRET);

                // ✅ CORRECCIÓN: Devolver el token dentro de un JSON
                res.json({ token }); // ✅ Ahora el frontend lo podrá leer correctamente
            })
            .catch(error => next(error));
    } catch (error) {
        next(error);
    }
};
