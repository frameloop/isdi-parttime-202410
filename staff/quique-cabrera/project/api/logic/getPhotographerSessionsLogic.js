import { Photographer, Session } from '../data/models.js'

const getPhotographerSessionsLogic = async (req) => {
    try {
        const photographerUserId = req.userId;

        const photographer = await Photographer.findOne({ user: photographerUserId }).populate('user', 'name email');
        if (!photographer) {
            return {
                error: { error: 'Not Found', message: 'Photographer not found' },
                status: 404
            };
        }

        const sessions = await Session.find({ photographer: photographer._id })
            .populate('customer', 'name email phone');

        return {
            data: {
                photographer: {
                    _id: photographer._id,
                    name: photographer.user.name,
                    email: photographer.user.email
                },
                sessions
            }
        };
    } catch (error) {
        console.error('Error en getPhotographerSessions:', error);
        return {
            error: { error: 'Internal Server Error', message: 'Error fetching photographer sessions' },
            status: 500
        };
    }
};

export default getPhotographerSessionsLogic;