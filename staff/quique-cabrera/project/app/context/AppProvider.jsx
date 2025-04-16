import React, { useState, useMemo } from 'react';
import { AppContext } from '../context';

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Memoizar el valor del contexto para evitar re-renders innecesarios
    const contextValue = useMemo(() => ({
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        isAuthenticated: !!user,
        // Función para limpiar el estado
        clearState: () => {
            setUser(null);
            setError(null);
        }
    }), [user, loading, error]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider; 