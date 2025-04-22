import { Session, Photographer } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'
import executeLogic from '../../helpers/executeLogic.js'

const createSessionLogic = async (req) => {
    const { photographerId, date, duration, customerId } = req.body

    // Validaciones iniciales
    if (!photographerId || !date || !duration || !customerId) {
        // Devolver un error estándar en lugar de un objeto personalizado
        // ya que executeLogic manejará el formato de error.
        // Esto también requiere que executeLogic maneje este caso (BadRequest o similar).
        // Por ahora, lanzaremos un SystemError como ejemplo, pero idealmente
        // se usaría un error más específico como ValidationError si estuviera disponible
        // y si executeLogic lo manejara adecuadamente.
        throw new SystemError('Todos los campos son requeridos');
    }

    const result = await executeLogic(
        async (photographerId, date, duration, customerId) => {
            // Verificar que el fotógrafo existe
            const photographer = await Photographer.findById(photographerId)
            if (!photographer) {
                throw new NotFoundError('Fotógrafo no encontrado')
            }

            // Crear la sesión
            const session = await Session.create({
                photographer: photographerId,
                customer: customerId,
                date,
                duration,
                status: 'pending'
            })

            // Asumiendo que photographer tiene 'name', si no, obtenerlo
            // Si el modelo Photographer no tiene 'name', necesitarás popularlo o buscarlo
            let photographerName = photographer.name; // O buscar user.name si es necesario
            if (!photographerName) {
                const user = await User.findById(photographer.user).lean();
                photographerName = user?.name || 'Nombre Desconocido';
            }

            return {
                _id: session._id.toString(),
                photographer: {
                    _id: photographer._id.toString(),
                    name: photographerName
                },
                // Incluir customerId y potencialmente customerName si es necesario
                customerId: customerId,
                date: session.date.toISOString(),
                duration: session.duration,
                status: session.status
            }
        },
        [photographerId, date, duration, customerId],
        201
    )

    // executeLogic ahora devuelve { data, status } o { error, status }
    // El controlador (handler) debería encargarse de enviar la respuesta.
    // Esta función de lógica ahora simplemente devuelve el resultado de executeLogic.
    return result
}

export default createSessionLogic 