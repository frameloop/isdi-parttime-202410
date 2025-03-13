import { Customer, Photographer, Session } from '../../../data/models.js';
import jwt from 'jsonwebtoken';

export const deleteSession = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Unauthorized' });

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.sub;

        const session = await Session.findById(req.params.id);
        if (!session) return res.status(404).json({ error: 'Session not found' });

        const isCustomer = session.customer.toString() === userId;
        const isPhotographer = session.photographer.toString() === userId;

        if (!isCustomer && !isPhotographer) {
            return res.status(403).json({ error: 'Forbidden: You can only delete your own sessions' });
        }

        await Session.findByIdAndDelete(req.params.id);

        await Promise.all([
            Customer.findByIdAndUpdate(session.customer, { $pull: { sessions: session._id } }),
            Photographer.findByIdAndUpdate(session.photographer, { $pull: { sessions: session._id } })
        ]);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
