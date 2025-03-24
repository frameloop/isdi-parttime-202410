import { Customer, Photographer, Session } from '../../../data/models.js';
import mongoose from 'mongoose';

export const createSession = (req, res) => {
    console.log('[createSession] Request received with body:', req.body);

    const { customerId, photographerId, date, type, address, services } = req.body;

    if (!customerId || !photographerId || !date) {
        console.error('[createSession] Missing required fields.');
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    const sessionDate = new Date(date);
    if (isNaN(sessionDate.getTime())) {
        console.error('[createSession] Invalid date format:', date);
        return res.status(400).json({ error: 'Invalid date format.' });
    }

    const now = new Date();
    if (sessionDate < now) {
        console.error('[createSession] The session date cannot be in the past:', sessionDate);
        return res.status(400).json({ error: 'The session date cannot be in the past.' });
    }

    Customer.findOne({ user: new mongoose.Types.ObjectId(customerId) })
        .then(customer => {
            if (!customer) {
                console.error(`[createSession] Customer not found: ${customerId}`);
                return res.status(404).json({ error: 'Customer not found.' });
            }

            return Photographer.findOne({ user: new mongoose.Types.ObjectId(photographerId) })
                .then(photographer => {
                    if (!photographer) {
                        console.error(`[createSession] Photographer not found: ${photographerId}`);
                        return res.status(404).json({ error: 'Photographer not found.' });
                    }

                    return Session.findOne({ photographer: photographer._id, date: sessionDate })
                        .then(existingSession => {
                            if (existingSession) {
                                console.error(`[createSession] Photographer already booked: ${sessionDate}`);
                                return res.status(400).json({ error: 'Photographer is already booked at this time.' });
                            }

                            // Creamos la nueva sesión con los campos adicionales
                            const session = new Session({
                                customer: customer._id,
                                photographer: photographer._id,
                                date: sessionDate,
                                type, // ✅ Aquí lo pasamos
                                address: address || {},
                                services: services || []
                            });

                            return session.save()
                                .then(savedSession => {
                                    return Promise.all([
                                        Customer.findByIdAndUpdate(customer._id, { $addToSet: { sessions: savedSession._id } }),
                                        Photographer.findByIdAndUpdate(photographer._id, { $addToSet: { sessions: savedSession._id } })
                                    ]).then(() => {
                                        res.status(201).json(savedSession);
                                    });
                                });
                        });
                });
        })
        .catch(error => {
            console.error('[createSession] Error creating session:', error);
            res.status(500).json({ error: 'Internal server error.' });
        });
};
