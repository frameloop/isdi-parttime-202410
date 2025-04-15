import { Photographer, User } from '../data/models.js'

const deletePhotographerLogic = async (req) => {
    try {
        const { id } = req.params;
        const role = req.user?.role;

        if (role !== 'administrator') {
            return {
                error: { error: 'Forbidden', message: 'No tienes permiso para realizar esta acción' },
                status: 403
            };
        }

        const photographer = await Photographer.findByIdAndDelete(id);

        if (!photographer) {
            return {
                error: { error: 'NotFound', message: 'Fotógrafo no encontrado' },
                status: 404
            };
        }

        if (photographer.user) {
            await User.findByIdAndDelete(photographer.user);
        }

        return {
            data: { message: 'Fotógrafo y usuario eliminados correctamente' }
        };
    } catch (error) {
        console.error('Error en deletePhotographerLogic:', error);
        return {
            error: { error: 'ServerError', message: error.message || 'Internal server error' },
            status: 500
        };
    }
};

export default deletePhotographerLogic;