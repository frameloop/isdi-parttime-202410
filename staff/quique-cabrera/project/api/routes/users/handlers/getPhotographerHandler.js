import { Photographer } from '../../../data/models.js';
import { NotFoundError } from 'com';

export const getPhotographer = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const photographer = await Photographer.findOne({ user: userId });

        if (!photographer) {
            throw new NotFoundError('Photographer not found');
        }

        res.json({
            id: photographer._id.toString(), //CUATE!
            user: photographer.user.toString(),
            coverage_area: photographer.coverage_area
        });

    } catch (error) {
        console.error("[Handler Error - getPhotographer]:", error);
        next(error);
    }
}; 