import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './view/Landing';
import LoginUser from './view/LoginUser';
import RecoverPassword from './view/RecoverPassword';
import Home from './view/Home';
import getUserSession from './logic/getUserSession';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserSession()
            .then(user => {
                setUser(user);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <Routes>
            <Route path="/" element={<Navigate to={user ? "/home" : "/landing"} />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
}

export default App;
