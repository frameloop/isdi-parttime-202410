import createHttpClient from '../core/httpClient';

const createPhotographersApi = (baseURL) => {
    const client = createHttpClient(baseURL);

    return {
        getAll: async (token) => {
            return client.get('/users/photographers', token);
        },

        add: async (token, photographerData) => {
            return client.post('/users/photographers', photographerData, token);
        },

        delete: async (token, id) => {
            return client.delete(`/users/photographers/${id}`, token);
        },

        getAvailability: async (token, photographerId) => {
            return client.get(`/sessions/availability/${photographerId}`, token);
        },

        createAvailability: async (token, availabilityData) => {
            return client.post('/sessions/availability', availabilityData, token);
        },

        updateAvailability: async (token, availabilityId, updates) => {
            return client.put(`/sessions/availability/${availabilityId}`, updates, token);
        },

        getSessions: async (token) => {
            return client.get('/sessions/my-sessions', token);
        }
    };
};

export default createPhotographersApi; 