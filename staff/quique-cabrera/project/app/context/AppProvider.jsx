import React, { useState, useMemo, useCallback } from 'react';
import { AppContext } from '../context';

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState({
        message: '',
        isVisible: false,
        isConfirmation: false,
        confirmCallback: null
    });

    const showAlert = useCallback((message) => {
        setAlert({
            message,
            isVisible: true,
            isConfirmation: false,
            confirmCallback: null
        });
    }, []);

    const showConfirmation = useCallback((message, confirmCallback) => {
        setAlert({
            message,
            isVisible: true,
            isConfirmation: true,
            confirmCallback
        });
    }, []);

    const handleConfirm = useCallback(() => {
        if (alert.confirmCallback) {
            alert.confirmCallback(true);
        }
        setAlert({
            message: '',
            isVisible: false,
            isConfirmation: false,
            confirmCallback: null
        });
    }, [alert]);

    const handleCancel = useCallback(() => {
        if (alert.confirmCallback) {
            alert.confirmCallback(false);
        }
        setAlert({
            message: '',
            isVisible: false,
            isConfirmation: false,
            confirmCallback: null
        });
    }, [alert]);

    const hideAlert = useCallback(() => {
        setAlert({
            message: '',
            isVisible: false,
            isConfirmation: false,
            confirmCallback: null
        });
    }, []);

    const contextValue = useMemo(() => ({
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        alert,
        showAlert,
        showConfirmation,
        handleConfirm,
        handleCancel,
        hideAlert,
        isAuthenticated: !!user,
        clearState: () => {
            setUser(null);
            setError(null);
            hideAlert();
        }
    }), [user, loading, error, alert, showAlert, showConfirmation, handleConfirm, handleCancel, hideAlert]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider; 