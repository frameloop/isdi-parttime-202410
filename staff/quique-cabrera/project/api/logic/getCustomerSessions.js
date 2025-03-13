import { Session } from '../data/models.js';

export default async function getCustomerSessions(userId) {
    return Session.find({ customer: userId }).populate('photographer', 'name');
}
