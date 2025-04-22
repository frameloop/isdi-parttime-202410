import { Photographer, User } from '../../data/models.js'
import executeLogic from '../../helpers/executeLogic.js'

const getPhotographersLogic = async () => {
    const result = await executeLogic(
        async () => {
            const photographers = await Photographer.find()
                .populate('user', 'name username email phone bio portfolio')
                .lean()

            return photographers.map(photographer => ({
                _id: photographer._id,
                name: photographer.user?.name || 'Nombre no encontrado',
                username: photographer.user?.username,
                email: photographer.user?.email,
                phone: photographer.user?.phone,
                bio: photographer.user?.bio || '',
                portfolio: photographer.user?.portfolio || [],
                coverage_area: photographer.coverage_area
            }))
        },
        [],
        200
    )

    if (result && result.data) {
        return {
            data: result.data,
            status: result.status || 200
        }
    }

    return result
}

export default getPhotographersLogic 