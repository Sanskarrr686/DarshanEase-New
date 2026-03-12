import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';

const Ologin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      const response = await axios.post("http://localhost:7000/user/login", payload);

      if (response.data.Status === "Success") {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userToken', response.data.token);
        alert('Login successful!');
        navigate('/uhome');
      } else {
        alert(response.data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <h2 className="absolute top-4 left-4 text-gray-500 hover:text-gray-900">
        <Link to="/"><FaSignOutAlt /></Link>
      </h2>

      <div className="bg-green-700 p-8 rounded-md shadow-md w-96">
        <h2 className="text-3xl font-extrabold text-center text-gray-200 mb-6">Organizer Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
          >
            Login
          </button>

          <p className="text-sm text-gray-300 pt-2 text-center">
            Don't have an account?{' '}
            <Link to="/organizer/signup" className="text-red-500 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Ologin;
