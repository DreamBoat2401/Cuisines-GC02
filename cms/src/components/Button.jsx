export default function Button({ nameProp }) {

    return (
        <>
        <button className="w-full py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-400 focus:outline-none focus:ring-1 focus:ring-green-500 transition">
            { nameProp }
        </button>
        </>
    )
}