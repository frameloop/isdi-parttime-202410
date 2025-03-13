import { Photographer, Session } from '../../../data/models.js';

export const getPhotographerSessions = async (req, res) => {
    try {
        console.log('🟢 [getPhotographerSessions] Request received');

        if (!req.user) {
            console.warn('⚠️ [getPhotographerSessions] No user found in request');
            return res.status(401).json({ error: "AuthorizationError", message: "User not found" });
        }

        console.log(`🔍 [getPhotographerSessions] Searching for photographer linked to user ID: ${req.user._id}`);

        const photographer = await Photographer.findOne({ user: req.user._id }).populate('user');

        if (!photographer) {
            console.warn(`⚠️ [getPhotographerSessions] No photographer found for user ID: ${req.user._id}`);
            return res.status(404).json({ error: 'Not Found', message: 'Photographer not found' });
        }

        console.log(`✅ [getPhotographerSessions] Photographer found:`, photographer);

        const sessions = await Session.find({ photographer: photographer._id })
            .populate('customer', 'name email phone');

        console.log(`✅ [getPhotographerSessions] Found ${sessions.length} sessions`);
        res.json({ photographer, sessions });
    } catch (error) {
        console.error('❌ [getPhotographerSessions] Error fetching photographer sessions:', error);
        res.status(500).json({ error: 'Internal Server Error', message: 'Error fetching photographer sessions' });
    }
};
