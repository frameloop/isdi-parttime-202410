function Alert({ message, onAccept, isConfirmation = false, onCancel }) {
    return <div className="w-full h-full fixed top-0 flex justify-center items-center z-50">
        {/* Eliminar completamente la capa de fondo negra */}
        {/* <div className="bg-black bg-opacity-40 w-full h-full absolute"></div> */}

        <div className="bg-white w-[80%] max-w-[500px] flex flex-col rounded-[15px] p-6 z-10 shadow-xl">
            <p className="text-[1em] text-black text-center mb-4">{message}</p>

            {isConfirmation ? (
                <div className="flex justify-center space-x-4">
                    <button
                        className="bg-gray-300 text-black font-bold py-2 px-4 rounded-lg flex-1"
                        onClick={onCancel || onAccept}>
                        No
                    </button>
                    <button
                        className="bg-[#B62682] text-white font-bold py-2 px-4 rounded-lg flex-1"
                        onClick={onAccept}>
                        Sí
                    </button>
                </div>
            ) : (
                <button
                    className="bg-[#B62682] text-white font-bold py-2 px-4 rounded-lg mt-4 flex justify-center items-center"
                    onClick={onAccept}>
                    Cerrar
                </button>
            )}
        </div>
    </div>
}

export default Alert


