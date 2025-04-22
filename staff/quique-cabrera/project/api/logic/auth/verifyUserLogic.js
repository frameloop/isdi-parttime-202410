import { User } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'
import { handleAuthError } from './authUtils.js'

// Modificado para verificar existencia por username
const verifyUserLogic = async (username) => {
    // Validar username (usando validate.text si es apropiado, o un check básico)
    // Nota: 'com' podría no tener un validador específico para username genérico.
    // Usaremos validate.text como placeholder, asumiendo que es un string no vacío.
    validate.text(username, 'username')

    try {
        // Buscar por username
        const user = await User.findOne({ username }).select('name email role').lean()

        if (!user) {
            throw new NotFoundError('User not found') // Lanzar error si no existe
        }

        // Devolver solo la información necesaria (el frontend usa 'name')
        return {
            // id: user._id.toString(), // El frontend no parece necesitar el id en este paso
            name: user.name,
            // email: user.email, // No necesario para mostrar el saludo
            // role: user.role // No necesario para mostrar el saludo
        }
    } catch (error) {
        // Devolver errores específicos o usar handleAuthError
        if (error instanceof NotFoundError) {
            // Podrías querer que NotFoundError se maneje de forma distinta aquí
            // Por ejemplo, devolver un status específico para "usuario no encontrado"
            // return { error: { error: 'NotFound', message: error.message }, status: 404 }
            throw error; // Re-lanzar para que el handler lo maneje
        }
        return handleAuthError(error) // Para otros errores (SystemError, etc.)
    }
}

export default verifyUserLogic 