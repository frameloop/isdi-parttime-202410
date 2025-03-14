import { Photographer } from '../../../data/models.js';

export const getAllPhotographers = async (req, res) => {
    try {
        console.log('🟢 [getAllPhotographers] Request received');

        const photographers = await Photographer.find().populate('user', 'name email phone');

        console.log(`✅ [getAllPhotographers] Found ${photographers.length} photographers`);
        res.json(photographers);
    } catch (error) {
        console.error('❌ [getAllPhotographers] Error fetching photographers:', error);
        res.status(500).json({ error: 'Internal Server Error', message: 'Error fetching photographers' });
    }
};
