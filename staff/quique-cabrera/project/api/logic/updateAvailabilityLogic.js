import { Availability } from '../data/models.js'

const updateAvailabilityLogic = async (req) => {
    try {
        const { id } = req.params;
        const updated = await Availability.findByIdAndUpdate(id, req.body, { new: true });

        if (!updated) {
            return { error: { error: 'No se encontró la disponibilidad' }, status: 404 };
        }

        return { data: updated };
    } catch (error) {
        return { error: { error: 'Error actualizando disponibilidad', details: error.message }, status: 500 };
    }
};

export default updateAvailabilityLogic;