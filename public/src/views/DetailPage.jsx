import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function DetailPage({ base_url }) {
    const [cuisine, setCuisine] = useState('')
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    console.log(cuisine);
    

    useEffect(() => {
        async function fetchCuisine() {
            try {
                const { data } = await axios.get(`${base_url}/apis/pub/restaurant-app/cuisines/${id}`)
                setCuisine(data.data)
            } catch (error) {
                console.log(error);
            } finally{
                setLoading(false)
            }
        }
        fetchCuisine()
    }, [id, base_url])
    return (
        <>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-green-500 flex flex-col bg-base-100 my-6 items-center p-20">
            <img 
            src={cuisine.imgUrl} 
            alt={cuisine.name} 
            className="max-w-sm rounded-lg shadow mb-5" 
            />
    <h2 className="text-xl font-semibold text-green-500">{cuisine.name}</h2>
    <p className="text-gray-600 mt-4">
      {cuisine.description}
    </p>
    <p className="text-green-500 mt-2 font-bold">Rp {cuisine.price}</p>
  </div>
  <br />
        <Link to='/' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex mx-96 items-center justify-center">Back</Link>
        </>
    )
}