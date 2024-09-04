import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moodleApi from '../api/moodle';

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
  const navigate = useNavigate();

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
  
    try {
      const response = await moodleApi.post('/moodle/webservice/rest/server.php', null, {
        params: {
          wsfunction: 'auth_email_signup_user',
          moodlewsrestformat: 'json',
          users: JSON.stringify([
            {
              username: formData.username,
              password: formData.password,
              firstname: formData.firstName,
              lastname: formData.lastName,
              email: formData.email,
            },
          ]),
        },
      });
  
      console.log('Sign up response:', response.data);
  
      if (response.data && response.data.length > 0 && response.status === 200) {
        navigate('/userhomepage');
      } else {
        console.error('Sign up failed:', response.data);
      }
    } catch (error) {
      console.error('Sign up error:', error.response ? error.response.data : error.message);
    }
  };
  

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Pass the correct fields
      const tokenResponse = await getMoodleAuthToken(formData.usernameOrEmail, formData.password);
      
      if (tokenResponse && tokenResponse.token) {
        // Store the token (e.g., in local storage)
        localStorage.setItem('moodleToken', tokenResponse.token);
        
        // Navigate to the user homepage
        navigate('/userhomepage');
      } else {
        console.error('Login failed:', tokenResponse);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  const getMoodleAuthToken = async (username, password) => {
    try {
      const response = await moodleApi.post('/moodle/login/token.php', null, {
        params: {
          service: 'dllms-moodle', // Replace with your service name
          username, // Correctly passing username
          password,
        },
      });
  
      return response.data; // This should include a token or similar
    } catch (error) {
      console.error('Token request error:', error);
      return null;
    }
  };
  
  

  return (
    <div className="bg-purple-500 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-center py-4 bg-black text-white">
            <h1 className="text-3xl font-bold">Welcome!</h1>
            <p className="mt-2">Start Learning</p>
          </div>
          <div className="p-2">
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 rounded-l-md focus:outline-none transition-colors duration-300 ${tab === 'signup' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTab('signup')}
              >
                Sign Up
              </button>
              <button
                className={`px-4 py-2 rounded-r-md focus:outline-none transition-colors duration-300 ${tab === 'login' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
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
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="emailConfirm"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    placeholder="Confirm Email Address"
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
                <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition-opacity duration-300 transform hover:scale-105">
                  Sign Up
                </button>
              </form>
            )}

            {tab === 'login' && (
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    name="usernameOrEmail" // Updated name
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    placeholder="Username or Email"
                    value={formData.usernameOrEmail} // Updated value
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
                <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition-opacity duration-300 transform hover:scale-105">
                  Login
                </button>
              </form>
            )}

            <div className="mt-6">
              <p className="text-center text-gray-600 mb-4">Or continue with</p>
              <div className="flex justify-center space-x-4">
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300">
                  <i className="fab fa-facebook-f mr-2"></i> Facebook
                </button>
                <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300">
                  <i className="fab fa-google mr-2"></i> Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
