import React from 'react';
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import useAdminData from '../hooks/useAdminData';
import PhotographerForm from './components/PhotographerForm';
import PhotographerList from './components/PhotographerList';

function HomeAdmin() {
    const {
        name,
        photographers,
        addPhotographer,
        deletePhotographer,
        logout
    } = useAdminData();

    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col items-center p-4">
            <header className="w-full flex justify-center items-center p-4 bg-black rounded-lg text-white relative">
                <h1 className="text-2xl font-bold">{name}</h1>
                <button
                    onClick={logout}
                    className="bg-red-600 px-1 py-1 rounded absolute font-extrabold right-4"
                >
                    <MdOutlineLogout />
                </button>
            </header>

            <PhotographerForm onSubmit={addPhotographer} />

            <PhotographerList
                photographers={photographers}
                onDelete={deletePhotographer}
            />
        </div>
    );
}

export default HomeAdmin;
