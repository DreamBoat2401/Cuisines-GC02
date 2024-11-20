import { useNavigate } from "react-router-dom"


export default function Card( {cuisine} ) {
    const navigate = useNavigate()

    function handleOnClick() {
        navigate(`/detail/${cuisine.id}`)
    }

    return(
        <>    
  {/* Card 1 */}
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-green-500 flex flex-col items-start"  onClick={handleOnClick}>
    <img
      src={cuisine.imgUrl}
      alt={cuisine.name}
      className="rounded-md mb-4"
    />
    <h2 className="text-xl font-semibold text-green-500">{cuisine.name}</h2>
    <p className="text-gray-600 mt-4">
      {cuisine.description}
    </p>
    <p className="text-green-500 mt-2 font-bold">{cuisine.price}</p>
  </div>
        </>


    )
}