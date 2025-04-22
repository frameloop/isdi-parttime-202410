import logic from '../../../logic/index.js'

export default async (req, res, next) => {
    try {
        const { name, username, email, password, phone, role, coverage_area, bio, portfolio } = req.body;

        const result = await logic.registerUserLogic(
            name,
            username,
            email,
            password,
            phone,
            role,
            coverage_area,
            bio,
            portfolio
        );

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}