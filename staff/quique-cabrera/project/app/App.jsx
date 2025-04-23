import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Landing from './view/Landing';
import LoginUser from './view/LoginUser';
import RecoverPassword from './view/RecoverPassword';
import HomeCustomer from './view/HomeCustomer';
import HomePhotographer from './view/HomePhotographer';
import HomeAdmin from './view/HomeAdmin';
import { usersApi } from './logic';
import { useAppContext } from './context';
import Alert from './view/components/Alert';

// Componente para manejar la autenticación y redirección
const AuthWrapper = ({ children }) => {
    const { user, setUser, setLoading } = useAppContext();

    React.useEffect(() => {
        const session = usersApi.getSession();
        setUser(session);
        setLoading(false);
    }, [setUser, setLoading]);

    return children;
};

function App() {
    return (
        <AppProvider>
            <AuthWrapper>
                <Routes>
                    <Route path="/" element={<Navigate to="/landing" />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/login" element={<LoginUser />} />
                    <Route path="/recover-password" element={<RecoverPassword />} />
                    <Route path="/home-customer" element={<HomeCustomer />} />
                    <Route path="/home-photographer" element={<HomePhotographer />} />
                    <Route path="/home-admin" element={<HomeAdmin />} />
                </Routes>
            </AuthWrapper>
        </AppProvider>
    );
}

export default App;