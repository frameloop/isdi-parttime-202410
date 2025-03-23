import logic from '../../../logic/index.js';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "ValidationError", message: "Username and password are required" });
        }

        logic.authenticateUser(username, password)
            .then(user => {
                if (!user) throw new Error("Authentication failed");
                const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token, role: user.role });
            })
            .catch(next);
    } catch (error) {
        next(error);
    }
};