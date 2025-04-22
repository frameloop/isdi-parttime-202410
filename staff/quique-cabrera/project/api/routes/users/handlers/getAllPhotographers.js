import logic from '../../../logic/index.js'

export const getAllPhotographers = async (req, res) => {
    try {
        console.log('[getAllPhotographers] Iniciando obtención de fotógrafos');
        const result = await logic.getPhotographersLogic();
        console.log('[getAllPhotographers] Resultado:', result);

        if (result.error) {
            console.error('[getAllPhotographers] Error:', result.error);
            return res.status(result.status || 500).json({ error: result.error });
        }

        // Asegurarse de que result.data es un array
        const photographers = Array.isArray(result.data) ? result.data : [];
        console.log('[getAllPhotographers] Enviando fotógrafos:', photographers);
        res.json(photographers);
    } catch (error) {
        console.error('[getAllPhotographers] Error no manejado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};