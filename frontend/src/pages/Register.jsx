import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form, { withCredentials: true })
      navigate('/login')
    } catch (error) {
      setError("Registration failed. Please check your credentials");
      console.log(error);
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl'>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form>
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Username" 
            value={form.username} 
            onChange={(e) => setForm({...form, username: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={(e) => setForm({...form, email: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input 
            type="password" 
            placeholder="Password" 
            value={form.password} 
            onChange={(e) => setForm({...form, password: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register