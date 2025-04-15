import logic from '../../../logic/index.js'

export const deletePhotographer = async (req, res, next) => {
    const result = await logic.deletePhotographerLogic(req);
    if (result.error) return res.status(result.status).json(result.error);
    res.status(200).json(result.data);
};