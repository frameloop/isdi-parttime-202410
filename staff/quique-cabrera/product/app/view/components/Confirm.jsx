function Confirm({ message, onCancel, onAccept }) {
    return <div className="w-full h-full fixed top-0 flex justify-center items-center">
        <div className="bg-black bg-opacity-10 w-[80%] h-[16%] flex flex-col rounded-[15px]">
            <p className="text-[1em] text-white text-center pt-3">{message}</p>
            <div className="flex items-center px-3 py-2 justify-center">
                <button className="button text-white font-bold rounded-lg" onClick={onAccept}>Accept</button>
                <button className="button text-white font-bold rounded-lg bg-black" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    </div>
}

export default Confirm


