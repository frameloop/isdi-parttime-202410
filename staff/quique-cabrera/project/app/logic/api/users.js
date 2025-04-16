import createHttpClient from '../core/httpClient';
import authService from '../core/auth';

const createUsersApi = (baseURL) => {
    const client = createHttpClient(baseURL);

    return {
        login: async (username, password) => {
            const data = await client.post('/users/login', { username, password });
            return authService.saveSession(data);
        },

        recoverPassword: async (username) => {
            return client.post('/users/recover-password', { username });
        },

        logout: () => {
            authService.clearSession();
        },

        getSession: () => {
            const token = authService.getToken();
            if (!token) return null;

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return {
                    userId: payload.sub,
                    name: localStorage.getItem('name'),
                    photographerId: localStorage.getItem('photographerId'),
                    role: payload.role
                };
            } catch (error) {
                return null;
            }
        },

        getToken: () => authService.getToken(),

        verify: async (username) => {
            return client.post('/users/verify', { username });
        }
    };
};

export default createUsersApi; 