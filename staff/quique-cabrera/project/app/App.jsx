import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './view/Landing';
import LoginUser from './view/LoginUser';
import RecoverPassword from './view/RecoverPassword';
import HomeCustomer from './view/HomeCustomer';
import HomePhotographer from './view/HomePhotographer';
import HomeAdmin from './view/HomeAdmin';
import { usersApi } from './logic';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = usersApi.getSession();
        setUser(session);
        setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <Routes>
            <Route path="/" element={<Navigate to={user ? "/home-customer" : "/landing"} />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
            <Route path="/home-customer" element={<HomeCustomer />} />
            <Route path="/home-photographer" element={<HomePhotographer />} />
            <Route path="/home-admin" element={<HomeAdmin />} />
        </Routes>
    );
}

export default App;