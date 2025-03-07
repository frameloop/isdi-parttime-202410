import logic from '../../../logic/index.js';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try {
        const { username, password } = req.body;

        logic.authenticateUser(username, password)
            .then(user => {
                if (!user) throw new Error("Authentication failed");

                const payload = { sub: user._id, role: user.role };

                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.json({ token, role: user.role });
            })
            .catch(error => next(error));
    } catch (error) {
        next(error);
    }
};
