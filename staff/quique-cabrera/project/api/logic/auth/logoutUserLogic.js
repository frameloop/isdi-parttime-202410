import { blacklistToken, handleAuthError } from './authUtils.js' // Importar también handleAuthError si no estaba

const logoutUserLogic = async (req) => {
    const token = req.headers.authorization?.split(' ')[1];

    // Validaciones iniciales
    if (!token) {
        return handleAuthError(new Error('Token no proporcionado')); // Use error handler
    }
    // Removed userId check as it might not be available/necessary for logout

    try {
        // Directly call the blacklistToken function
        blacklistToken(token);
        return {
            data: {
                success: true,
                message: 'Usuario desconectado exitosamente'
            },
            status: 200
        };
    } catch (error) {
        return handleAuthError(error); // Use centralized error handling
    }

    // Removed executeLogic wrapper as logoutUser seems synchronous and handles its own errors/logic
    // const result = await executeLogic(
    //     logoutUser, // logoutUser itself might not be async or fit executeLogic pattern
    //     [token],
    //     200
    // );

    // // Simplified success/error handling using direct call and catch block
    // if (result.data) {
    //     return {
    //         data: {
    //             success: true,
    //             message: 'Usuario desconectado exitosamente'
    //         },
    //         status: result.status
    //     };
    // }
    // return handleAuthError(result.error || new Error('Error desconocido en logout')); 
};

export default logoutUserLogic; 