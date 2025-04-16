import createHttpClient from './core/httpClient';
import authService from './core/auth';
import createUsersApi from './api/users';
import createPhotographersApi from './api/photographers';
import createSessionsApi from './api/sessions';

const API_URL = import.meta.env.VITE_API_URL;

export const httpClient = createHttpClient(API_URL);
export const usersApi = createUsersApi(API_URL);
export const photographersApi = createPhotographersApi(API_URL);
export const sessionsApi = createSessionsApi(API_URL);
export { authService };

export { default as redirectByRole } from './helpers/redirectByRole';
export { default as validateUsername } from './validation/validateUsername';
export { default as validatePassword } from './validation/validatePassword';

// Exportar hooks compartidos
export { default as useAuth } from './hooks/useAuth';
export { default as useApiRequest } from './hooks/useApiRequest';

// Mantener compatibilidad con código anterior
export default {
    loginUser: usersApi.login,
    getUsserSession: usersApi.getSession,
    recoverPassword: usersApi.recoverPassword,
    logoutUser: usersApi.logout
};