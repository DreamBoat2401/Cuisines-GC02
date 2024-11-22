import { useState, useEffect } from "react";
import axios from "axios";

export default function Category({ base_url }) {
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${base_url}/apis/restaurant-app/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Category List
        </h1>
        <ul className="divide-y divide-gray-200">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between items-center py-4 px-6 hover:bg-gray-50 transition duration-200 rounded-md"
            >
              <span className="text-gray-700 font-medium">{category.id}</span>
              <span className="text-gray-900 font-semibold">{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
