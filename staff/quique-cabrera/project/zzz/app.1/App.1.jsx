import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './view/Landing';

function App() {
    console.log("App.jsx se ha renderizado correctamente"); // Depuración

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/landing" />} />
            <Route path="/landing" element={<Landing />} />
        </Routes>
    );
}

export default App;
