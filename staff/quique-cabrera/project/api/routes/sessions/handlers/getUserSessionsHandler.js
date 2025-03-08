import { Session, Customer, Photographer } from '../../../data/models.js';

export const getUserSessions = async (req, res) => {
    try {
        console.log('🟢 [getUserSessions] Request received');

        if (!req.user) {
            console.error('❌ [getUserSessions] User not found in request');
            return res.status(401).json({ error: 'Unauthorized', message: 'User not found' });
        }

        const userId = req.user._id;
        const role = req.user.role;

        console.log(`🟢 [getUserSessions] User ID: ${userId}`);
        console.log(`🟢 [getUserSessions] Role: ${role}`);

        let userRef;
        let sessions;

        if (role === 'customer') {
            userRef = await Customer.findOne({ user: userId }); // Buscar el ID correcto del cliente
            if (!userRef) {
                console.error('❌ [getUserSessions] Customer not found');
                return res.status(404).json({ error: 'Not Found', message: 'Customer not found' });
            }
            sessions = await Session.find({ customer: userRef._id }) // Buscar sesiones con el ID correcto
                .populate('photographer', 'user') // Agregar info del fotógrafo
                .sort({ date: 1 });
        } else if (role === 'photographer') {
            userRef = await Photographer.findOne({ user: userId }); // Buscar el ID correcto del fotógrafo
            if (!userRef) {
                console.error('❌ [getUserSessions] Photographer not found');
                return res.status(404).json({ error: 'Not Found', message: 'Photographer not found' });
            }
            sessions = await Session.find({ photographer: userRef._id }) // Buscar sesiones con el ID correcto
                .populate('customer', 'user') // Agregar info del cliente
                .sort({ date: 1 });
        } else {
            console.error('❌ [getUserSessions] Unauthorized role:', role);
            return res.status(403).json({ error: 'Forbidden', message: 'Unauthorized role' });
        }

        console.log(`🟢 [getUserSessions] Found ${sessions.length} sessions`);
        res.json(sessions);
    } catch (error) {
        console.error('❌ [getUserSessions] Error fetching user sessions:', error);
        res.status(500).json({ error: 'Internal Server Error', message: 'Error fetching user sessions' });
    }
};
