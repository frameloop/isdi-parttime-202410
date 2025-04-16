import createHttpClient from '../core/httpClient';

const createSessionsApi = (baseURL) => {
    const client = createHttpClient(baseURL);

    return {
        getCustomerSessions: async (token) => {
            return client.get('/sessions/my-sessions', token);
        },

        getAvailability: async (token) => {
            return client.get('/sessions/availability', token);
        }
    };
};

export default createSessionsApi; 