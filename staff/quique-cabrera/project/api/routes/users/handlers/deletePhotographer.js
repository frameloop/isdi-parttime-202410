import { Photographer, User } from '../../../data/models.js'

export const deletePhotographer = async (req, res, next) => {
    try {
        const { id } = req.params
        const role = req.user?.role

        // Validación de permisos: solo un admin puede borrar fotógrafos
        if (role !== 'administrator') {
            return res.status(403).json({ error: 'Forbidden', message: 'No tienes permiso para realizar esta acción' })
        }

        const photographer = await Photographer.findByIdAndDelete(id)

        if (!photographer) {
            return res.status(404).json({ error: 'NotFound', message: 'Fotógrafo no encontrado' })
        }

        // Si el fotógrafo tenía un user asociado, lo eliminamos también
        if (photographer.user) {
            await User.findByIdAndDelete(photographer.user)
        }

        res.status(200).json({ message: 'Fotógrafo y usuario eliminados correctamente' })

    } catch (error) {
        console.error('Error en deletePhotographer:', error)
        next(error)
    }
}
