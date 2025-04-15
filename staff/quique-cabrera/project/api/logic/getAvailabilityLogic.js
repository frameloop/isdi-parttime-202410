import { Availability } from '../data/models.js'
import mongoose from 'mongoose'

const getAvailabilityLogic = async (req) => {
    try {
        const { photographerId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(photographerId)) {
            return { error: { error: "ID de fotógrafo no válido" }, status: 400 };
        }

        const availability = await Availability.find({ photographer: photographerId }).sort({ date: 1 });
        return { data: availability };
    } catch (error) {
        return { error: { error: 'Error fetching availability', details: error.message }, status: 500 };
    }
};

export default getAvailabilityLogic;