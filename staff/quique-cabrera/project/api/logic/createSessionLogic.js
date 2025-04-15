import { Customer, Photographer, Session, Availability } from '../data/models.js'
import mongoose from 'mongoose'

const createSessionLogic = async (req) => {
    try {
        const customerUserId = req.user._id;
        const { photographerId, date, type, address, services } = req.body;

        if (!photographerId || !date) {
            return { error: { error: 'Faltan campos obligatorios: photographerId o date.' }, status: 400 };
        }

        const sessionDate = new Date(date);
        if (isNaN(sessionDate.getTime())) {
            return { error: { error: 'Formato de fecha inválido.' }, status: 400 };
        }

        if (sessionDate.getTime() < Date.now()) {
            return { error: { error: 'La fecha no puede estar en el pasado.' }, status: 400 };
        }

        const customer = await Customer.findOne({ user: new mongoose.Types.ObjectId(customerUserId) });
        if (!customer) {
            return { error: { error: 'Cliente no encontrado.' }, status: 404 };
        }

        const photographer = await Photographer.findOne({ user: new mongoose.Types.ObjectId(photographerId) });
        if (!photographer) {
            return { error: { error: 'Fotógrafo no encontrado.' }, status: 404 };
        }

        const startDate = new Date(sessionDate);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

        const availability = await Availability.findOne({
            photographer: photographer._id,
            available: true,
            $and: [
                { startDate: { $lte: new Date(startDate.toISOString()) } },
                { endDate: { $gte: new Date(endDate.toISOString()) } }
            ]
        }).lean();

        if (!availability) {
            return { error: { error: 'El fotógrafo no está disponible en este horario.' }, status: 400 };
        }

        const availabilityStart = new Date(availability.startDate);
        const availabilityEnd = new Date(availability.endDate);

        if (startDate < availabilityStart || endDate > availabilityEnd) {
            return { error: { error: 'El horario solicitado está fuera del rango de disponibilidad del fotógrafo.' }, status: 400 };
        }

        const session = new Session({
            customer: customer._id,
            photographer: photographer._id,
            date: sessionDate,
            type,
            address: address || {},
            services: services || []
        });

        const savedSession = await session.save();

        await Promise.all([
            Customer.findByIdAndUpdate(customer._id, { $addToSet: { sessions: savedSession._id } }),
            Photographer.findByIdAndUpdate(photographer._id, { $addToSet: { sessions: savedSession._id } })
        ]);

        return { data: savedSession };
    } catch (error) {
        console.error('❌ Error en createSessionLogic:', error);
        return { error: { error: 'Error interno del servidor.' }, status: 500 };
    }
};

export default createSessionLogic;