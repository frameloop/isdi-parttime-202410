import logic from '../../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await logic.authenticateUserLogic(username, password);
        const payload = { sub: user._id, role: user.role };

        if (user.role === 'photographer') {
            const photographer = await logic.findPhotographerProfile(user._id);
            payload.photographerId = photographer._id.toString();
            const token = logic.generateToken(payload);
            return res.json(createAuthResponse(user, token, photographer._id.toString()));
        }

        const token = logic.generateToken(payload);
        return res.json(createAuthResponse(user, token));
    } catch (error) {
        handleAuthError(error, res, next);
    }
};