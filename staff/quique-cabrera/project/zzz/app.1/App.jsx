import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './view/Landing';
import LoginUser from './view/LoginUser'; // Import LoginUser component

function App() {
    console.log("App.jsx has been rendered correctly"); // Debugging

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/landing" />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<LoginUser />} /> {/* Login route */}
        </Routes>
    );
}

export default App;
