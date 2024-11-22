import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


export default function HomePage({ base_url }) {
    const [cuisine, setCuisine] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function fetchCuisine() {
        try {
            const { data } = await axios.get(`${base_url}/apis/restaurant-app/cuisines`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            // console.log(data.data, '<<<data');
            setCuisine(data.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    function priceBeingRupiah(price) {
        const formatter = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        });
    
        return formatter.format(price);
      }


      async function handleDelete(e, id) {
          e.preventDefault()
        try {

            const { data } = await axios.delete(`${base_url}/apis/restaurant-app/cuisines/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            },
        fetchCuisine()
        )
        } catch (error) {
            console.log(error);
            
        }
      }


      function handleEdit(e, id) {
        e.preventDefault();
        navigate(`/edit/${id}`);
      }



    useEffect(() => {
        fetchCuisine()
    }, [])

    return(
        <>
        <section className="col-span-12 lg:col-span-10 px-4" id="product-section">
  {/* Header */}
  <div className="flex flex-wrap justify-between items-center py-4 border-b mb-4">
    <h1 className="text-4xl font-bold text-gray-800">Cuisines</h1>
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-600"
      id="new-product"
    >
      <span className="material-icons-outlined">+</span> New Cuisine
    </button>
  </div>
  {/* Table */}
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 text-sm text-left">
      <thead className="bg-gray-100 border-b">
        <tr>
          <th scope="col" className="px-4 py-2">
            #
          </th>
          <th scope="col" className="px-4 py-2">
            Name
          </th>
          <th scope="col" className="px-4 py-2 w-48">
            Image
          </th>
          <th scope="col" className="px-4 py-2 w-64">
            Description
          </th>
          <th scope="col" className="px-4 py-2">
            Price
          </th>
          <th scope="col" className="px-4 py-2">
            Author
          </th>
          <th scope="col" className="px-4 py-2 text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody id="table-product">
        {cuisine.slice().reverse().map((el, index) => (
        <tr key={el.id} className="border-b">
          <td className="px-4 py-2">{index + 1}</td>
          <td className="px-4 py-2 font-semibold">{el.name}</td>
          <td className="px-4 py-2">
            <img
              src={el.imgUrl}
              className="h-16 w-full object-cover rounded"
              alt="Product Image"
            />
          </td>
          <td className="px-4 py-2">{el.description}</td>
          <td className="px-4 py-2 font-bold">{priceBeingRupiah(el.price)}</td>
          <td className="px-4 py-2">{el.User.username}</td>
          <td className="px-4 py-2">
            <div className="flex justify-center space-x-2">
              <a href="#" className="text-red-500 hover:text-red-600" onClick={(e) => (handleDelete(e, el.id))}>
                <span className="material-icons-outlined">delete</span>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600" onClick={(e) => (handleEdit(e, el.id))}>
                <span className="material-icons-outlined">edit</span>
              </a>
              <Link to={`/upload-image/${el.id}`} href="#" className="text-green-500 hover:text-green-600">
                <span className="material-icons-outlined">image</span>
              </Link>
            </div>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

        </>
    )
}