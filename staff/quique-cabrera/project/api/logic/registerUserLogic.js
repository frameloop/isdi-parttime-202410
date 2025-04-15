import logic from '../logic/index.js'

const registerUserLogic = async (req) => {
    const { name, email, phone, username, password, role, coverage_area } = req.body;

    try {
        if (!name || !email || !phone || !username || !password || !role) {
            return {
                error: { error: 'All fields are required' },
                status: 400
            };
        }

        if (role === 'photographer' && !coverage_area) {
            return {
                error: { error: 'Coverage area is required for photographers' },
                status: 400
            };
        }

        if (!global.processingUsers) global.processingUsers = {};
        if (global.processingUsers[username]) {
            return {
                error: { error: 'Duplicate request detected' },
                status: 429
            };
        }

        global.processingUsers[username] = true;

        const user = await logic.registerUser(name, email, phone, username, password, role, coverage_area);

        return {
            data: {
                success: true,
                message: role === 'photographer'
                    ? 'Photographer registered successfully'
                    : 'User registered successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    role: user.role
                }
            }
        };

    } catch (error) {
        if (error.name === 'DuplicityError') {
            return {
                error: { error: 'El usuario ya está registrado' },
                status: 409
            };
        }

        return {
            error: {
                error: 'ServerError',
                message: error.message || 'Internal server error'
            },
            status: 500
        };
    } finally {
        delete global.processingUsers[username];
    }
};

export default registerUserLogic;