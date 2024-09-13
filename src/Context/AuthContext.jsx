import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/moodle', // Ensure this matches your backend URL
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await api.get('/login/token.php', {
        params: {
          service: 'moodle_mobile_app',
          username,
          password,
        },
      });
  
      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('moodleToken', token);
        localStorage.setItem('moodleUsername', username); // Store the username
        await fetchUser(token, username);
        navigate('/userhomepage'); // Ensure navigation happens after fetching user
      } else {
        console.error('Login failed:', response.data);
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };
  
 
  

  const handleSignup = async (userData) => {
    const result = await signup(userData);
    if (result.success) {
      navigate('/userhomepage');
    } else {
      setError(result.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('moodleToken');
    localStorage.removeItem('moodleUsername'); // Remove username as well
    setUser(null); // Reset user state
    navigate('/login'); // Redirect to login page after logout
  };
  

  const fetchUser = async (token, username) => {
    if (!username) {
      console.error('Username is not defined.');
      setError('Username is required to fetch user data.');
      setLoading(false);
      return;
    }

    try {
      console.log(`Fetching user with token: ${token} and username: ${username}`);

      const response = await api.get('/webservice/rest/server.php', {
        params: {
          wsfunction: 'core_user_get_users_by_field',
          moodlewsrestformat: 'json',
          field: 'username',
          values: [username],
          wstoken: token,
        },
      });

      console.log('User Data Response:', response.data);

      if (response.data && response.data.length > 0) {
        const user = response.data[0];

        // Fetch enrolled courses
        const enrolledCoursesResponse = await api.get('/webservice/rest/server.php', {
          params: {
            wsfunction: 'core_enrol_get_users_courses',
            moodlewsrestformat: 'json',
            userid: user.id,
            wstoken: token,
          },
        });

        console.log('Enrolled Courses Response:', enrolledCoursesResponse.data);

        if (enrolledCoursesResponse.data && enrolledCoursesResponse.data.length > 0) {
          const enrolledCourses = enrolledCoursesResponse.data;
          setUser({ ...user, enrolledCourses });
        } else {
          console.error('Failed to fetch enrolled courses.');
          setError('Failed to fetch enrolled courses.');
        }
      } else {
        console.error('User fetching failed:', response.data);
        setError('Failed to fetch user data.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      setError('An error occurred while fetching user data.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('moodleToken');
    const username = localStorage.getItem('moodleUsername'); // Retrieve the username
    if (token && username) {
      fetchUser(token, username);
    } else {
      setLoading(false);
    }
  }, []);

 

  return (
    <AuthContext.Provider value={{ user, login, handleSignup, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
