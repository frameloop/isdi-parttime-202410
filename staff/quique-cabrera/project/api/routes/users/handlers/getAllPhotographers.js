import { Photographer } from '../../../data/models.js'

export const getAllPhotographers = async (req, res) => {
    try {
        // Obtenemos todos los fotógrafos
        // y populamos datos básicos del usuario asociado
        const photographers = await Photographer.find()
            .populate('user', 'name email phone')

        res.json(photographers)
    } catch (error) {
        console.error('Error en getAllPhotographers:', error)
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error fetching photographers'
        })
    }
}
