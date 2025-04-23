function Alert({ message, onAccept }) {
    return <div className="w-full h-full fixed top-0 flex justify-center items-center">
        <div className="bg-black bg-opacity-10 w-[50%] flex flex-col rounded-[15px] p-6">
            <p className="text-[1em] text-white text-center ">{message}</p>

            <button className="bg-pink text-white font-bold py-2 px-4 rounded-lg mt-4 flex justify-center items-center" onClick={onAccept}>
                Close
            </button>
        </div>
    </div>
}

export default Alert


