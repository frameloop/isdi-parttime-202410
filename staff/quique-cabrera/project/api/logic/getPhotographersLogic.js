import { Photographer } from '../data/models.js'

const getPhotographersLogic = async () => {
    try {
        const photographers = await Photographer.find()
            .populate('user', 'name email')
            .select('-__v');

        return { data: photographers };
    } catch (error) {
        console.error('Error en getPhotographersLogic:', error);
        return {
            error: { error: 'ServerError', message: 'Error fetching photographers' },
            status: 500
        };
    }
};

export default getPhotographersLogic;