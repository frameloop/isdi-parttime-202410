import { Availability } from '../data/models.js'

const getAllAvailabilityLogic = async () => {
    try {
        const availability = await Availability.find()
            .populate({
                path: 'photographer',
                populate: { path: 'user', select: 'name' },
                select: 'coverage_area user'
            })
            .sort({ date: 1 });

        const result = availability
            .filter(slot => slot.photographer?.user)
            .map(slot => ({
                ...slot.toObject(),
                photographer: {
                    _id: slot.photographer.user._id,
                    name: slot.photographer.user.name,
                    coverage_area: slot.photographer.coverage_area
                }
            }));

        return { data: result };
    } catch (error) {
        return { error: { error: 'Error fetching all availability', details: error.message }, status: 500 };
    }
};

export default getAllAvailabilityLogic;