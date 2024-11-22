import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function AddUser({ base_url }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(
    e,
    username,
    email,
    password,
    phoneNumber,
    address
  ) {
    e.preventDefault();
    try {
      const body = { username, email, password, phoneNumber, address };

      const { data } = await axios.post(`${base_url}/apis/add-user`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data);

      Toastify({
        text: `Success add new user`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
        },
      }).showToast();

      navigate("/");
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
        },
      }).showToast();
    }
  }

  return (
    <>
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <h1 className="text-lg font-medium text-gray-800 text-center mb-6">
        Add New User (Staff)
      </h1>
      <form
        className="space-y-4"
        onSubmit={(e) =>
          handleSubmit(e, username, email, password, phoneNumber, address)
        }
      >
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm text-gray-600">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm text-gray-600">
            Address
          </label>
          <textarea
            name="address"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
        >
          Add User
        </button>
      </form>
    </div>
  </div>
</>

  );
}