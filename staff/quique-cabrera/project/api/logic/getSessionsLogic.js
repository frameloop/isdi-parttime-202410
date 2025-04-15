import { Session } from '../data/models.js'

const getSessionsLogic = async () => {
    try {
        const sessions = await Session.find()
            .populate('customer', 'name email')
            .populate('photographer', 'name email');

        return { data: sessions };
    } catch (error) {
        console.error('Error en getSessions:', error);
        return {
            error: { error: 'Error fetching sessions' },
            status: 500
        };
    }
};

export default getSessionsLogic;