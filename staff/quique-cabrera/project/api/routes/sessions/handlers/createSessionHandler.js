import { Customer, Photographer, Session } from '../../../data/models.js';
import mongoose from 'mongoose';

// 📌 Crear una sesión
export const createSession = (req, res) => {
    console.log('📩 [createSession] Request received with body:', req.body);

    const { customerId, photographerId, date } = req.body;

    // 🛑 Validar que todos los campos están presentes
    if (!customerId || !photographerId || !date) {
        console.error('❌ [createSession] Missing required fields.');
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    // 📌 Validar que la fecha tiene el formato correcto
    const sessionDate = new Date(date);
    if (isNaN(sessionDate.getTime())) {
        console.error('❌ [createSession] Invalid date format:', date);
        return res.status(400).json({ error: 'Invalid date format.' });
    }

    // 🚀 Validar que la fecha no es en el pasado
    const now = new Date();
    if (sessionDate < now) {
        console.error('❌ [createSession] The session date cannot be in the past:', sessionDate);
        return res.status(400).json({ error: 'The session date cannot be in the past.' });
    }

    console.log(`🔍 [createSession] Checking if customer exists: ${customerId}`);
    Customer.findOne({ user: new mongoose.Types.ObjectId(customerId) })
        .then(customer => {
            if (!customer) {
                console.error(`❌ [createSession] Customer not found: ${customerId}`);
                return res.status(404).json({ error: 'Customer not found.' });
            }
            console.log(`✅ [createSession] Customer found: ${customerId}`);

            console.log(`🔍 [createSession] Checking if photographer exists: ${photographerId}`);
            return Photographer.findOne({ user: new mongoose.Types.ObjectId(photographerId) })
                .then(photographer => {
                    if (!photographer) {
                        console.error(`❌ [createSession] Photographer not found: ${photographerId}`);
                        return res.status(404).json({ error: 'Photographer not found.' });
                    }
                    console.log(`✅ [createSession] Photographer found: ${photographerId}`);

                    console.log(`🔍 [createSession] Checking if photographer is already booked at ${sessionDate}`);
                    return Session.findOne({ photographer: photographer._id, date: sessionDate })
                        .then(existingSession => {
                            if (existingSession) {
                                console.error(`❌ [createSession] The photographer is already booked at this time: ${sessionDate}`);
                                return res.status(400).json({ error: 'The photographer is already booked at this time.' });
                            }
                            console.log(`✅ [createSession] Photographer is available at ${sessionDate}`);

                            console.log(`🛠️ [createSession] Creating session...`);
                            const session = new Session({ customer: customer._id, photographer: photographer._id, date });

                            return session.save()
                                .then(savedSession => {
                                    console.log(`✅ [createSession] Session created successfully: ${savedSession._id}`);

                                    console.log(`🔗 [createSession] Linking session to customer ${customer._id} and photographer ${photographer._id}`);
                                    return Promise.all([
                                        Customer.findByIdAndUpdate(customer._id, { $addToSet: { sessions: savedSession._id } }),
                                        Photographer.findByIdAndUpdate(photographer._id, { $addToSet: { sessions: savedSession._id } })
                                    ]).then(() => {
                                        console.log(`✅ [createSession] Session linked successfully`);
                                        res.status(201).json(savedSession);
                                    });
                                });
                        });
                });
        })
        .catch(error => {
            console.error('❌ [createSession] Error creating session:', error);
            res.status(500).json({ error: 'Internal server error.' });
        });
};
