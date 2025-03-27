import { Customer, Photographer, Session } from '../../../data/models.js'
import mongoose from 'mongoose'

export const createSession = async (req, res) => {
    try {
        const customerUserId = req.user._id // ✅ Corrección aquí
        const { photographerId, date, type, address, services } = req.body

        // Validación de campos obligatorios
        if (!photographerId || !date) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: photographerId o date.' })
        }

        const sessionDate = new Date(date)
        console.log('[BACK] Fecha recibida en el body:', date)
        console.log('[BACK] Interpreta como fecha:', sessionDate.toString())

        if (isNaN(sessionDate.getTime())) {
            return res.status(400).json({ error: 'Formato de fecha inválido.' })
        }

        if (sessionDate.getTime() < Date.now()) {
            return res.status(400).json({ error: 'La fecha no puede estar en el pasado.' })
        }

        // 🔍 Buscar cliente asociado al usuario autenticado
        const customer = await Customer.findOne({ user: new mongoose.Types.ObjectId(customerUserId) })
        if (!customer) {
            return res.status(404).json({ error: 'Cliente no encontrado.' })
        }

        // 🔍 Buscar fotógrafo por su ID de usuario
        const photographer = await Photographer.findOne({ user: new mongoose.Types.ObjectId(photographerId) })
        if (!photographer) {
            return res.status(404).json({ error: 'Fotógrafo no encontrado.' })
        }

        // ⛔ Verificar conflicto de horario exacto (una hora de duración por sesión)
        const startTime = new Date(sessionDate)
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000)

        const conflictingSession = await Session.findOne({
            photographer: photographer._id,
            date: {
                $gte: startTime,
                $lt: endTime
            }
        })

        if (conflictingSession) {
            return res.status(400).json({ error: 'El fotógrafo ya tiene una sesión en este horario.' })
        }

        // ✅ Crear nueva sesión
        const session = new Session({
            customer: customer._id,
            photographer: photographer._id,
            date: sessionDate,
            type,
            address: address || {},
            services: services || []
        })

        const savedSession = await session.save()

        // 🔗 Vincular sesión con cliente y fotógrafo
        await Promise.all([
            Customer.findByIdAndUpdate(customer._id, { $addToSet: { sessions: savedSession._id } }),
            Photographer.findByIdAndUpdate(photographer._id, { $addToSet: { sessions: savedSession._id } })
        ])

        res.status(201).json(savedSession)

    } catch (error) {
        console.error('❌ Error en createSession:', error)
        res.status(500).json({ error: 'Error interno del servidor.' })
    }
}
