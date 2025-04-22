import createHttpClient from '../core/httpClient';

const createSessionsApi = (baseURL) => {
    const client = createHttpClient(baseURL);

    return {
        getCustomerSessions: async (token) => {
            return client.get('/sessions/my-sessions', token);
        },

        getAvailability: async (token, photographerId) => {
            return client.get(`/sessions/availability/${photographerId}`, token);
        },

        createSession: async (token, sessionData) => {
            return client.post('/sessions', sessionData, token);
        }
    };
};

export default createSessionsApi; 