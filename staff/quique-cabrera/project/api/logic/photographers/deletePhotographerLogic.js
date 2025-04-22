import { User, Photographer } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'

const deletePhotographerLogic = async (photographerDocId) => {
    try {
        validate.id(photographerDocId)

        const photographerDoc = await Photographer.findById(photographerDocId)

        if (!photographerDoc) {
            throw new NotFoundError('Documento de fotógrafo no encontrado con el ID proporcionado')
        }

        const userIdToDelete = photographerDoc.user
        if (!userIdToDelete) {
            throw new SystemError('El documento de fotógrafo no tiene un usuario asociado.')
        }

        const deletionResultUser = await User.findByIdAndDelete(userIdToDelete)
        if (!deletionResultUser) {
            console.warn(`[DeletePhotographerLogic] No se encontró el usuario con ID ${userIdToDelete} para eliminar, asociado al fotógrafo ${photographerDocId}.`)
        }

        await Photographer.findByIdAndDelete(photographerDocId)

        return {
            message: 'Fotógrafo y usuario asociado eliminados correctamente'
        }
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof SystemError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}

export default deletePhotographerLogic 