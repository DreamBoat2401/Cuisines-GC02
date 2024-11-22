import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import gearLoad from "../assets/loading.svg";

export default function HomePage({ base_url }) {
  const [cuisines, setCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pagination = getPagination();

  function getPagination() {
    const maxVisiblePages = 5;

    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPage, startPage + maxVisiblePages - 1);

    let temp = [];
    for (let i = 1; i <= totalPage; i++) {
      temp.push(i);
    }

    return temp;
  }

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  async function fetchCuisines() {
    try {
      setLoading(true);
      let url = `${base_url}/apis/pub/restaurant-app/cuisines?q=${search}&limit=9&page=${currentPage}&i=${currentCategories}`;
      if (sort) url += `&sort=${sort}`;
      if (currentCategories) url += `&categoryId=${currentCategories}`;

      const { data } = await axios.get(url);
      console.log("API Response:", data);

      if (data && data.data && data.data.query.length > 0) {
        setCuisines(data.data.query);
        setTotalPage(data.data.pagination.totalPage);
        setCurrentPage(data.data.pagination.currentPage);
      } else {
        setCuisines([]);
      }
    } catch (error) {
      console.error("API Error:", error.response || error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${base_url}/apis/restaurant-app/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      console.log("Categories Data:", data.data);
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  function handleCategoryChange(e) {
    const selectedCategory = encodeURIComponent(e.target.value);
    console.log(selectedCategory, "Selected Category");
    setCurrentCategories(selectedCategory);
    setCurrentPage(1);
  }

  function handleSearch(e) {
    e.preventDefault();
    setCurrentPage(1);
    fetchCuisines();
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCuisines();
  }, [currentPage, sort, currentCategories]); // Tambahkan currentCategories ke dependencies

  return (
    <>
      <div className="bg-gray-200 min-h-screen">
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MakanBank!!!</title>
        {/* Header */}
        <header className="text-center py-12">
          <h1 className="text-6xl font-bold text-green-500">
            Anda lapar. Kami antar.
          </h1>
          <p className="text-gray-700 mt-4">
            Hemat? boleh! Pelit?? jangan!!! pesanlah makanan kesukaanmu tanpa
            kamu perlu memikirkan harga.
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
          <select
            className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none"
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="order-by">Order By</option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
          <select
            className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none"
            onChange={(e) => handleCategoryChange(e)}
          >
            <option value="">All Categories</option>
            {Array.isArray(categories) &&
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </section>
        {/* Card */}
        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            <img src={gearLoad} alt="Loading" className="animate-spin w-12 h-12" />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
      <div className="flex justify-center items-center mt-10 space-x-2">
        {currentPage > 1 && (
          <button
            className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
            onClick={() => setCurrentPage(1)}
          >
            « First
          </button>
        )}
        <button
          className={`px-4 py-2 rounded-full ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            currentPage === totalPage
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPage}
        >
          »
        </button>
        {currentPage < totalPage && (
          <button
            className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
            onClick={() => setCurrentPage(totalPage)}
          >
            Last »
          </button>
        )}
      </div>
    </>
  );
}
