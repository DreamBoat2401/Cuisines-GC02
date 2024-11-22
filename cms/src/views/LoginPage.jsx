import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom' 


export default function LoginPage({ base_url }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        try {
            // console.log(email, password);
            const { data } = await axios.post(`${base_url}/apis/login`, { email, password })
            // console.log(data.data.access_token);
            localStorage.setItem("access_token", data.data.access_token)
            
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div className="flex min-h-screen items-center justify-center bg-gray-200">
            <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl transition-transform transform hover:scale-105 hover:shadow-xl duration-500">
    
                {/* Image */}
                <div className="w-full md:w-1/2">
                <img
                    className="w-full h-full"
                    src="https://i.pinimg.com/originals/6c/f2/3e/6cf23e8dbb36c8871e1e95320b2c47ba.gif"
                    alt="Pokemon GIF"
                />
            </div>

            {/* Form */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-r from-white to-gray-50 shadow-inner rounded-r-lg">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Welcome back admin!</h2>
                <form className="space-y-6" onSubmit={handleLogin} method="POST">
        
            {/* Email */}
                <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input input-bordered w-full bg-gray-100 text-gray-900 rounded-lg shadow focus:ring-2 focus:ring-indigo-500 focus:outline-none p-3 transition-all duration-300"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="input input-bordered w-full bg-gray-100 text-gray-900 rounded-lg shadow focus:ring-2 focus:ring-indigo-500 focus:outline-none p-3 transition-all duration-300"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {/* Login Button */}
            <div>
            <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-gray-900 font-bold shadow-lg rounded-lg py-2 transition-all transform hover:scale-105 duration-300"
            >
                Log in
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
        </>
    )
}