import { Photographer } from '../data/models.js'

export default async function findPhotographerProfile(userId) {
    const photographer = await Photographer.findOne({ user: userId }).select('_id')

    if (!photographer) {
        throw new Error('PhotographerNotFound')
    }

    return photographer
}
