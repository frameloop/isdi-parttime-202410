import verifyUserExists from '../../../logic/verifyUserExists.js';

export default (req, res, next) => {
    try {
        console.log("Request body received:", req.body); // <--- Esto ayuda a depurar

        if (!req.body || typeof req.body !== 'object') {
            throw new Error('Invalid request body');
        }

        const { username } = req.body;

        verifyUserExists(username)
            .then(response => {
                if (!response) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(response);
            })
            .catch(error => next(error));
    } catch (error) {
        next(error);
    }
};
