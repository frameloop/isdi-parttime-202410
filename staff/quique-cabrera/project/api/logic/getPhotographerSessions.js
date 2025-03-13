import { Session } from '../data/models.js';

export default async function getPhotographerSessions(userId) {
    return Session.find({ photographer: userId }).populate('customer', 'name');
}
