import { Availability } from '../data/models.js'

const createAvailabilityLogic = async (req) => {
    try {
        const { photographer, date, startDate, endDate, available } = req.body;
        if (!photographer || !date || !startDate || !endDate || available === undefined) {
            return { error: { error: 'Faltan campos requeridos' }, status: 400 };
        }

        const parsedDate = new Date(date + 'T00:00:00');
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        const existingAvailability = await Availability.findOne({
            photographer,
            date: parsedDate,
            startDate: parsedStartDate,
            endDate: parsedEndDate
        });

        if (existingAvailability) {
            return { error: { error: "Ya existe una disponibilidad para este horario" }, status: 400 };
        }

        const newAvailability = new Availability({
            photographer,
            date: parsedDate,
            startDate: parsedStartDate,
            endDate: parsedEndDate,
            available
        });
        await newAvailability.save();
        return { data: newAvailability, status: 201 };
    } catch (error) {
        return { error: { error: "Error creando disponibilidad", details: error.message }, status: 500 };
    }
};

export default createAvailabilityLogic;