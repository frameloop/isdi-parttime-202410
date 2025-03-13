import mongoose from 'mongoose';
import { Availability, Photographer } from '../../../data/models.js';

// 🔹 Obtener disponibilidad de un fotógrafo
export const getAvailability = async (req, res) => {
    try {
        const { photographerId } = req.params;
        console.log(`[getAvailability] 📅 Buscando disponibilidad para el fotógrafo ${photographerId}`);

        // Verificar que photographerId es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(photographerId)) {
            return res.status(400).json({ error: "ID de fotógrafo no válido" });
        }

        const availability = await Availability.find({ photographer: photographerId }).sort({ date: 1 });
        res.json(availability);
    } catch (error) {
        console.error('[getAvailability] ❌ Error:', error);
        res.status(500).json({ error: 'Error fetching availability', details: error.message });
    }
};

// 🔹 Obtener todas las disponibilidades
export const getAllAvailability = async (req, res) => {
    try {
        const availability = await Availability.find();
        res.json(availability);
    } catch (error) {
        console.error('[getAllAvailability] ❌ Error:', error);
        res.status(500).json({ error: 'Error fetching all availability', details: error.message });
    }
};

// 🔹 Crear disponibilidad
export const createAvailability = async (req, res) => {
    try {
        console.log("[createAvailability] 📥 Datos recibidos:", req.body);

        let { photographer, date, startTime, endTime, available } = req.body;

        // Verificar datos requeridos
        if (!photographer || !date || !startTime || !endTime || available === undefined) {
            console.error("[createAvailability] ❌ Faltan datos en la solicitud:", req.body);
            return res.status(400).json({ error: "Faltan datos en la solicitud", data: req.body });
        }

        // Convertir date a tipo Date
        date = new Date(date);
        if (isNaN(date.getTime())) {
            console.error("[createAvailability] ❌ Fecha inválida:", date);
            return res.status(400).json({ error: "Fecha inválida" });
        }

        // 🔹 Verificar si ya existe una disponibilidad en el mismo horario
        const existingAvailability = await Availability.findOne({ photographer, date, startTime, endTime });
        if (existingAvailability) {
            console.error("[createAvailability] 🚫 Ya existe una disponibilidad para este horario");
            return res.status(400).json({ error: "Ya existe una disponibilidad para este horario" });
        }

        // 🔹 Crear la nueva disponibilidad
        console.log("[createAvailability] 🔨 Creando nueva disponibilidad...");
        const newAvailability = new Availability({ photographer, date, startTime, endTime, available });

        await newAvailability.save();
        console.log("[createAvailability] ✅ Disponibilidad guardada correctamente:", newAvailability);
        res.status(201).json(newAvailability);
    } catch (error) {
        console.error("[createAvailability] ❌ Error inesperado:", error);
        res.status(500).json({ error: "Error creando disponibilidad", details: error.message });
    }
};
