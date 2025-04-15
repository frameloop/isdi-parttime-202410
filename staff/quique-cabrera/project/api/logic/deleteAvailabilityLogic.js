import { Availability } from '../data/models.js'

const deleteAvailabilityLogic = async (req) => {
    try {
        const { id } = req.params;
        const deleted = await Availability.findByIdAndDelete(id);

        if (!deleted) {
            return { error: { error: 'No se encontró la disponibilidad' }, status: 404 };
        }

        return { data: { success: true } };
    } catch (error) {
        return { error: { error: 'Error eliminando disponibilidad', details: error.message }, status: 500 };
    }
};

export default deleteAvailabilityLogic;