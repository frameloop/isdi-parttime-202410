import logic from '../../../logic/index.js'

// Refactorizar getAvailability para obtener la disponibilidad POR PHOTOGRAPHER ID
export const getAvailability = async (req, res, next) => {
    try {
        // Extraer photographerId de los parámetros de la ruta
        const { photographerId } = req.params;

        // Validar que photographerId existe (aunque la lógica también lo hará)
        if (!photographerId) {
            // Lanzar un error específico o usar uno existente si aplica
            return res.status(400).json({ error: 'BadRequest', message: 'Photographer ID is required in the path' });
        }

        // Llamar a la NUEVA lógica
        const availability = await logic.getPhotographerAvailabilityLogic(photographerId);

        // La lógica ahora devuelve un array (posiblemente vacío)
        res.json(availability);

    } catch (error) {
        // Pasar el error al manejador global
        next(error);
    }
};

export const getAllAvailability = async (req, res, next) => {
    try {
        const result = await logic.getAllAvailabilityLogic();
        // Asumiendo que getAllAvailabilityLogic ahora lanza errores
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const updateAvailability = async (req, res, next) => {
    try {
        // Extraer el ID del slot de los parámetros de la ruta
        const { id: availabilityId } = req.params;
        // Extraer los datos a actualizar del cuerpo de la solicitud
        const { date, startDate, endDate, available } = req.body;

        // Validar que el ID existe
        if (!availabilityId) {
            return res.status(400).json({ error: 'BadRequest', message: 'Availability ID is required in the path' });
        }

        // Crear el objeto de actualizaciones (solo incluir campos presentes en el body)
        const updates = {};
        if (date !== undefined) updates.date = date; // Considerar validación/formato de fecha
        if (startDate !== undefined) updates.startDate = startDate; // Considerar validación/formato de fecha ISO
        if (endDate !== undefined) updates.endDate = endDate; // Considerar validación/formato de fecha ISO
        if (available !== undefined) updates.available = available;

        // Validar que hay algo que actualizar
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'BadRequest', message: 'No update data provided' });
        }

        // Llamar a la lógica pasando el ID y el objeto de actualizaciones
        const updatedAvailability = await logic.updateAvailabilityLogic(availabilityId, updates);

        // Devolver el slot actualizado
        res.json(updatedAvailability);

    } catch (error) {
        next(error);
    }
};

export const createAvailability = async (req, res, next) => {
    try {
        const result = await logic.createAvailabilityLogic({
            body: req.body,
            userId: req.userId
        });

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteAvailability = async (req, res, next) => {
    try {
        // Extraer el ID del slot de disponibilidad de los parámetros de la ruta
        const { id: availabilityId } = req.params;

        // Validar que el ID existe (la lógica también lo hará con validate.id)
        if (!availabilityId) {
            return res.status(400).json({ error: 'BadRequest', message: 'Availability ID is required in the path' });
        }

        // Llamar a la lógica pasando SOLO el availabilityId
        await logic.deleteAvailabilityLogic(availabilityId);

        // Devolver una respuesta exitosa sin contenido
        res.status(204).send();

    } catch (error) {
        // Pasar el error al manejador global
        next(error);
    }
};