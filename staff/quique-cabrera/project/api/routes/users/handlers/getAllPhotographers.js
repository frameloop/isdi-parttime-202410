import logic from '../../../logic/index.js'

export const getAllPhotographers = async (req, res) => {
    const result = await logic.getPhotographersLogic();
    if (result.error) return res.status(result.status).json(result.error);
    res.json(result.data);
};