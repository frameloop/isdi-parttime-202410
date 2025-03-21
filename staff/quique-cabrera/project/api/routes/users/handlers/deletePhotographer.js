import { Photographer, User } from '../../../data/models.js';

export const deletePhotographer = async (req, res, next) => {
    try {
        const { id } = req.params;

        console.log(`[deletePhotographer] 🗑️ Intentando eliminar fotógrafo con ID: ${id}`);

        // Buscar el fotógrafo en la DB
        const photographer = await Photographer.findById(id);
        if (!photographer) {
            console.log(`[deletePhotographer] ❌ No se encontró el fotógrafo con ID: ${id}`);
            return res.status(404).json({ error: 'Fotógrafo no encontrado' });
        }

        // Eliminar el fotógrafo
        await Photographer.findByIdAndDelete(id);
        console.log(`[deletePhotographer] ✅ Fotógrafo eliminado: ${id}`);

        // 🔥 También eliminar al usuario asociado 🔥
        const userId = photographer.user;
        if (userId) {
            await User.findByIdAndDelete(userId);
            console.log(`[deletePhotographer] ✅ Usuario eliminado: ${userId}`);
        }

        res.status(200).json({ message: 'Fotógrafo y usuario eliminados correctamente' });

    } catch (error) {
        console.error(`[deletePhotographer] ❌ Error al eliminar fotógrafo:`, error);
        next(error);
    }
};
