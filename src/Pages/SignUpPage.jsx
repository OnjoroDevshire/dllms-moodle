import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext'; 
// Adjust the import path as needed

const SignUpPage = () => {
  const [tab, setTab] = useState('signup');
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    username: '',
    email: '',
    emailConfirm: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup, login } = useContext(AuthContext);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (formData.email !== formData.emailConfirm) {
      console.error('Email addresses do not match');
      return;
    }

    const userData = {
      username: formData.username,
      password: formData.password,
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
    };

    try {
      await signup(userData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.usernameOrEmail, formData.password);
      navigate('/userhomepage');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-center py-4 bg-blue-600 text-white">
            <h1 className="text-3xl font-bold">Welcome!</h1>
            <p className="mt-2">Start Learning</p>
          </div>
          <div className="p-2">
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 rounded-l-md focus:outline-none transition-colors duration-300 ${tab === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTab('signup')}
              >
                Sign Up
              </button>
              <button
                className={`px-4 py-2 rounded-r-md focus:outline-none transition-colors duration-300 ${tab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTab('login')}
              >
                Login
              </button>
            </div>

            {tab === 'signup' && (
              <form className="space-y-4" onSubmit={handleSignUpSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="emailConfirm"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    placeholder="Confirm Email"
                    value={formData.emailConfirm}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sign Up
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
              </form>
            )}

            {tab === 'login' && (
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    name="usernameOrEmail"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    placeholder="Username or Email"
                    value={formData.usernameOrEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Login
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
