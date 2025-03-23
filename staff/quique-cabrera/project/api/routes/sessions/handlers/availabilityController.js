import mongoose from 'mongoose';
import { Availability } from '../../../data/models.js';

export const getAvailability = async (req, res) => {
    try {
        const { photographerId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(photographerId)) {
            return res.status(400).json({ error: "ID de fotógrafo no válido" });
        }
        const availability = await Availability.find({ photographer: photographerId }).sort({ date: 1 });
        res.json(availability);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching availability', details: error.message });
    }
};

export const getAllAvailability = async (req, res) => {
    try {
        const availability = await Availability.find();
        res.json(availability);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching all availability', details: error.message });
    }
};

export const createAvailability = async (req, res) => {
    try {
        const { photographer, date, startTime, endTime, available } = req.body;
        if (!photographer || !date || !startTime || !endTime || available === undefined) {
            return res.status(400).json({ error: "Faltan datos en la solicitud", data: req.body });
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ error: "Fecha inválida" });
        }

        const existingAvailability = await Availability.findOne({ photographer, date: parsedDate, startTime, endTime });
        if (existingAvailability) {
            return res.status(400).json({ error: "Ya existe una disponibilidad para este horario" });
        }

        const newAvailability = new Availability({ photographer, date: parsedDate, startTime, endTime, available });
        await newAvailability.save();
        res.status(201).json(newAvailability);
    } catch (error) {
        res.status(500).json({ error: "Error creando disponibilidad", details: error.message });
    }
};

// 🔧 Actualizar disponibilidad
export const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;

        const updated = await Availability.findByIdAndUpdate(id, update, { new: true });
        if (!updated) return res.status(404).json({ error: 'NotFound', message: 'No se encontró la disponibilidad' });

        res.json(updated);
    } catch (error) {
        console.error('[updateAvailability] ❌ Error:', error);
        res.status(500).json({ error: 'Error actualizando disponibilidad', details: error.message });
    }
};

// 🗑️ Eliminar disponibilidad
export const deleteAvailability = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Availability.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: 'NotFound', message: 'No se encontró la disponibilidad' });

        res.json({ success: true });
    } catch (error) {
        console.error('[deleteAvailability] ❌ Error:', error);
        res.status(500).json({ error: 'Error eliminando disponibilidad', details: error.message });
    }
};
