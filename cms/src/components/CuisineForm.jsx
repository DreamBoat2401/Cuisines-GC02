import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";

export default function CuisineForm({ 
    base_url,
    formTitle,
    nameProp,
    handleSubmit,
    cuisine
}) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState(1);
  const [categories, setCategories] = useState([]);

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
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (cuisine) {
      setName(cuisine.name);
      setDescription(cuisine.description);
      setImgUrl(cuisine.imgUrl);
      setPrice(cuisine.price);
      setStock(cuisine.stock);
      setCategoryId(cuisine.categoryId);
    }
  }, [cuisine]);

    return(
        <>
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-xl bg-white text-black shadow-lg p-8 rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-8 text-gray-700">
        {formTitle}
      </h1>
      <form
        className="space-y-6"
        onSubmit={(event) =>
          handleSubmit(
            event,
            name,
            description,
            price,
            imgUrl,
            stock,
            categoryId
          )
        }
      >
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Cuisine Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="imgUrl"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Image URL
          </label>
          <input
            type="text"
            name="imgUrl"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Stock
            </label>
            <input
              type="number"
              name="stock"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Category
          </label>
          <select
            name="categoryId"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
            <Button nameProp={nameProp} />
          {/* <button
            type="submit"
            className="w-full py-2 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 transition"
          >
            {nameProp}
          </button> */}
        </div>
      </form>
    </div>
  </div>
</>

    )
}