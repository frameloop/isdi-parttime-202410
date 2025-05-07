import { Session } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'
import executeLogic from '../../helpers/executeLogic.js'

const deleteSessionLogic = async (req) => {
    const { sessionId } = req.params //<<<<-----------

    // Validaciones iniciales
    if (!sessionId) {
        // Lanzar error para que executeLogic lo maneje
        throw new SystemError('ID de sesión requerido');
    }

    const result = await executeLogic(
        async (sessionId) => {
            validate.id(sessionId, 'session ID'); // Validar ID aquí

            const session = await Session.findById(sessionId)

            if (!session) {
                throw new NotFoundError('Sesión no encontrada')
            }

            await Session.findByIdAndDelete(sessionId)

            return {
                success: true,
                message: 'Sesión eliminada correctamente'
            }
        },
        [sessionId],
        200 // OK
    )

    return result
}

export default deleteSessionLogic 