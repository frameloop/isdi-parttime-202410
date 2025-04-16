import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../index';

/**
 * Hook compartido para gestionar la autenticación del usuario
 * @param {string|Array} requiredRole - Rol o roles requeridos para acceder
 * @param {boolean} redirectIfNotAuthenticated - Si debe redirigir al login si no está autenticado
 * @returns {Object} El estado de autenticación y funciones de utilidad
 */
export default function useAuth(requiredRole = null, redirectIfNotAuthenticated = true) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    // Comprueba la autenticación al montar el componente
    useEffect(() => {
        const session = usersApi.getSession();

        if (!session) {
            if (redirectIfNotAuthenticated) {
                navigate('/login');
            }
            return;
        }

        setUser(session);
        setIsAuthenticated(true);

        // Si se requiere un rol específico, comprobar autorización
        if (requiredRole) {
            const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
            const hasRequiredRole = roles.includes(session.role);

            setIsAuthorized(hasRequiredRole);

            if (!hasRequiredRole && redirectIfNotAuthenticated) {
                navigate('/login');
            }
        } else {
            setIsAuthorized(true);
        }
    }, [navigate, requiredRole, redirectIfNotAuthenticated]);

    // Función para cerrar sesión
    const logout = () => {
        usersApi.logout();
        navigate('/login');
    };

    return {
        user,
        isAuthenticated,
        isAuthorized,
        logout,
        getToken: usersApi.getToken
    };
} 