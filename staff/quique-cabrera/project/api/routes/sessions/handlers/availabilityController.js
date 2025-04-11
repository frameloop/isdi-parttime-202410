import { Availability } from '../../../data/models.js'
import mongoose from 'mongoose'

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
}

export const getAllAvailability = async (req, res) => {
    try {
        console.log('[getAllAvailability] Buscando disponibilidad global...');

        const availability = await Availability.find()
            .populate({
                path: 'photographer',
                populate: { path: 'user', select: 'name' },
                select: 'coverage_area user'
            })
            .sort({ date: 1 });

        const result = availability
            .filter(slot => slot.photographer?.user) // ⚠️ filtramos los que estén completos
            .map(slot => ({
                ...slot.toObject(),
                photographer: {
                    _id: slot.photographer.user._id,
                    name: slot.photographer.user.name,
                    coverage_area: slot.photographer.coverage_area
                }
            }));

        console.log(`[getAllAvailability] Devolviendo ${result.length} slots`);
        res.json(result);

    } catch (error) {
        console.error('[getAllAvailability] ERROR:', error.message);
        res.status(500).json({ error: 'Error fetching all availability', details: error.message });
    }
};

export const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Availability.findByIdAndUpdate(id, req.body, { new: true });

        if (!updated) {
            return res.status(404).json({ error: 'No se encontró la disponibilidad' });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando disponibilidad', details: error.message });
    }
}

export const createAvailability = async (req, res) => {
    try {
        const { photographer, date, startDate, endDate, available } = req.body;
        if (!photographer || !date || !startDate || !endDate || available === undefined) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        const parsedDate = new Date(date);
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        const existingAvailability = await Availability.findOne({
            photographer,
            date: parsedDate,
            startDate: parsedStartDate,
            endDate: parsedEndDate
        });

        if (existingAvailability) {
            return res.status(400).json({ error: "Ya existe una disponibilidad para este horario" });
        }

        const newAvailability = new Availability({
            photographer,
            date: parsedDate,
            startDate: parsedStartDate,
            endDate: parsedEndDate,
            available
        });
        await newAvailability.save();
        res.status(201).json(newAvailability);
    } catch (error) {
        res.status(500).json({ error: "Error creando disponibilidad", details: error.message });
    }
};

export const deleteAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Availability.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'No se encontró la disponibilidad' });
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando disponibilidad', details: error.message });
    }
}
