import React from 'react';

function RecoverPasswordModal({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-[#E1F56E] bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
                <p className="text-black font-semibold mb-4">
                    ¿Te enviamos un correo de recuperación?
                </p>
                <div className="flex justify-around">
                    <button
                        onClick={onConfirm}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600 transition"
                    >
                        Sí, por favor!
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        No, paso!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecoverPasswordModal;
