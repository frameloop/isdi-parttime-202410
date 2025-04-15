import logic from '../../../logic/index.js'

export const getAvailability = async (req, res) => {
    const result = await logic.getAvailabilityLogic(req);
    if (result.error) return res.status(result.status).json(result.error);
    res.json(result.data);
};

export const getAllAvailability = async (req, res) => {
    const result = await logic.getAllAvailabilityLogic();
    if (result.error) return res.status(result.status).json(result.error);
    res.json(result.data);
};

export const updateAvailability = async (req, res) => {
    const result = await logic.updateAvailabilityLogic(req);
    if (result.error) return res.status(result.status).json(result.error);
    res.json(result.data);
};

export const createAvailability = async (req, res) => {
    const result = await logic.createAvailabilityLogic(req);
    if (result.error) return res.status(result.status).json(result.error);
    res.status(result.status || 200).json(result.data);
};

export const deleteAvailability = async (req, res) => {
    const result = await logic.deleteAvailabilityLogic(req);
    if (result.error) return res.status(result.status).json(result.error);
    res.json(result.data);
};