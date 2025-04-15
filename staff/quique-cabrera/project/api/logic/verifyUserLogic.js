import verifyUserExists from '../logic/verifyUserExists.js'

const verifyUserLogic = async (req) => {
    try {
        const { username } = req.body;

        if (!username || typeof username !== 'string') {
            return {
                error: {
                    error: 'Invalid input',
                    message: 'Username is required'
                },
                status: 400
            };
        }

        const user = await verifyUserExists(username);

        if (!user) {
            return {
                error: {
                    error: 'UserNotFound',
                    message: 'No se encontró el usuario'
                },
                status: 404
            };
        }

        return {
            data: {
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    role: user.role
                }
            }
        };

    } catch (error) {
        console.error('Error en verifyUserLogic:', error);
        return {
            error: {
                error: 'ServerError',
                message: 'Internal server error'
            },
            status: 500
        };
    }
};

export default verifyUserLogic;