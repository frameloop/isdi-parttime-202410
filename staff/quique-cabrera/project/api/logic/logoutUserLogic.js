import logoutUser from '../logic/logoutUser.js'

const logoutUserLogic = async (req) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token || !req.userId) {
            return {
                error: { error: 'Invalid logout request' },
                status: 400
            };
        }

        logoutUser(token);

        return {
            data: {
                success: true,
                message: 'User logged out successfully'
            }
        };
    } catch (error) {
        console.error('Error en logoutUserLogic:', error);
        return {
            error: {
                error: 'ServerError',
                message: 'Internal server error'
            },
            status: 500
        };
    }
};

export default logoutUserLogic;

