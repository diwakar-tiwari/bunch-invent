import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ name, email, password });
      console.log("Registration Response:", response); // Check response
  
      localStorage.setItem("userName", response.data.user.name); // Store username in localStorage
      toast.success('Registration successful! Please log in.');
      navigate('/login'); // Redirect after successful registration
    } catch (err) {
      console.log("Registration Error:", err.response); // Check the error response
  
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage); // Show error in form
      toast.error(errorMessage); // Show error toast
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
