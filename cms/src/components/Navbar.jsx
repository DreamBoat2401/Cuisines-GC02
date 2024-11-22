import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate('/login')
    }

    return(
        <>
        <nav className="navbar sticky top-0 z-10 p-4 bg-gray-100 shadow flex items-center justify-between">
            <div className="navbar-start">
                <Link to="/" className="text-2xl font-bold px-4 text-green-500 hover:text-green-700 transition duration-200">
                    MakanBank!!!
                 </Link>
            </div>
  
        <div className="navbar-end flex items-center space-x-3">
            <Link to="/categories" className="btn btn-accent btn-sm hover:bg-accent-dark transition duration-200">
                Categories
            </Link>
            <Link to="/add-cuisine" className="btn btn-accent btn-sm hover:bg-accent-dark transition duration-200">
                Add Cuisine
            </Link>
            <Link to="/add-user" className="btn btn-neutral btn-sm hover:bg-neutral-dark transition duration-200">
                Add User
            </Link>
                <button className="btn btn-error btn-sm hover:bg-red-600 transition duration-200" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
        </>
    )
}