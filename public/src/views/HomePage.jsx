import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios"


export default function HomePage({ base_url }) {
    const [cuisines, setCuisines] = useState([])
    const [categories, setCategories] = useState([])
    const [currentCategories, setCurrentCategories] = useState("")
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    console.log(cuisines)

    const pagination = getPagination();

    function getPagination() {
        let temp = []
        for (let i = 1; i <= totalPage; i++) {
            temp.push(i)
        }
    
        return temp
    }
    
    function handlePrev() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
      }
      
      function handleNext() {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1)
        }
      }

    async function fetchCuisines() {
        try {
            setLoading(true)
            let url = `${base_url}/apis/pub/restaurant-app/cuisines?q=${search}&i=${currentCategories}&limit=8&page=${currentPage}`;
                if (sort) {
                    url += `&sort=${sort}`; 
                }
                if (currentCategories) {
                    url += `&categoryId=${currentCategories}`;
                }

            const { data } = await axios.get(`${base_url}/apis/pub/restaurant-app/cuisines?q=${search}&i=${currentCategories}&limit=8&page=${currentPage}`)
            if (data && data.data && Array.isArray(data.data.query)) {
                setCuisines(data.data.query);
                setTotalPage(data.data.pagination.totalPage);
                setCurrentPage(data.data.pagination.currentPage);
              } else {
                setCuisines([]);
              }
              
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${base_url}/apis/pub/restaurant-app/categories`)
            setCategories(data.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    function handleCategoryChange(e) {
        setCurrentCategories(
          e.target.value.replaceAll(" ", "%20").replaceAll("&", "%26") 
        );
        setCurrentPage(1);
      }

      function handleSearch(e) {
        e.preventDefault()
        setCurrentPage(1)
        fetchCuisines()
      }

    useEffect(() => {
        fetchCuisines()
        fetchCategories()
    }, [currentPage, sort, currentCategories])

    return(
        <>
    <div className="bg-gray-200 min-h-screen">
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pay Once Use Forever</title>
  {/* Header */}
  <header className="text-center py-12">
    <h1 className="text-6xl font-bold text-green-500">
      Anda lapar. Kami antar.
    </h1>
    <p className="text-gray-700 mt-4">
      Hemat? boleh! Pelit?? jangan!!! pesanlah makanan kesukaanmu tanpa kamu
      perlu memikirkan harga.
    </p>
  </header>
  {/* Search and Filters */}
  <section className="flex justify-center items-center gap-4 py-8">
    <form onSubmit={handleSearch}>
    <input
      type="text"
      placeholder="Cari makanan kesukaanmu..."
      className="px-4 py-2 w-96 bg-gray-800 text-white rounded-md focus:outline-none"
      onChange={(e) => setSearch(e.target.value)}
    />
    </form>
    <select className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none" onChange={(e) => setSort(e.target.value)}>
      <option value="order-by">Order By</option>
      {/* Add options here */}
      <option value="">Sort</option>
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
    </select>
    <select className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none" onChange={(e) => handleCategoryChange(e)}>
    <option value="">Categories</option>
  {Array.isArray(categories) &&
    categories.map((category) => (
      <option key={category.id} value={category.name.replace(" ", "%20")}>
        {category.name}
      </option>
    ))}
    </select>
  </section>
  {/* Card */}
  
  <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 md:px-32 py-8">
    {cuisines.map((cuisine) => (
  <Card
  key={cuisine.id}
  cuisine={cuisine}
  base_url={"https://h8-phase2-gc.vercel.app"}
  fetchCuisines={fetchCuisines}
  />
    ))}
  </section>
  </div>
  <div className="join mt-10 flex items-center justify-center space-x-2">
          <button
            className="join-item btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-full shadow-md"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            «
          </button>
          {pagination.map((el) => (
            <button
              key={el}
              className={
                el === currentPage
                  ? "join-item btn btn-active bg-green-500 text-white rounded-full shadow-lg px-4 py-2"
                  : "join-item btn bg-green-400 text-white hover:bg-green-500 rounded-full shadow-md px-4 py-2"
              }
              onClick={() => setCurrentPage(el)}
            >
              {el}
            </button>
          ))}
          <button
            className="join-item btn bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-full shadow-md"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            »
          </button>
        </div>
    </>
    )
}