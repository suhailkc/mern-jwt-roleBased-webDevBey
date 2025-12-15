import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../config/axios';

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {});
      setAuth(null)
      navigate("/login")
    } catch (error) {
      console.error("Logout failed, error");
    }
  }

  return (
    <nav className='bg-gray-800 p-4 text-white'>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white mr-4">Home</Link>
        <div>{auth?.email}</div>
        <div>
          {auth?.accessToken ? (
            <>
              <button 
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className='text-white mr-4'>Login</Link>
              <Link to="/register" className='text-white mr-4'>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar