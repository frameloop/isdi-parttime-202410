import React, { useEffect, useState } from 'react';

function Home() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || 'Guest';
        setUsername(storedUsername);
    }, []);

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-black tracking-wider mb-6">Welcome, {username}!</h1>
            <p className="text-black">This is your home page after login.</p>

            <footer className="absolute bottom-4 text-black text-sm font-semibold">
                emestudi © 2025
            </footer>
        </div>
    );
}

export default Home;
