import React, { useState, useEffect } from 'react';
import moodleApi from '../api/moodle'; // Update with the correct path

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch categories from the Moodle API
  const fetchCategories = async () => {
    try {
      const response = await moodleApi.get('/moodle/webservice/rest/server.php', {
        params: {
          wsfunction: 'core_course_get_categories', // Replace with the correct Moodle function
          moodlewsrestformat: 'json',
        },
      });

      // Process the response data to extract categories
      const categoriesData = response.data;
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='w-full  bg-gray-50 p-6 '>
      <div className='w-full bg-gray-50 h-[2vw]'>
        <p className='text-[1.5vw] mt-[0.5] font-serif  font-bold text-black '>
          Top Categories
        </p>
      </div>

      <div className='flex justify-center mt-[2vw] mb-[3vw]'>
        <div className='w-[80vw] flex flex-wrap gap-[2vw] justify-center'>
          {categories.map((category, index) => (
            <button
              key={index}
              className='bg-black text-white text-[1vw] font-semibold mt-[0.6vw] font-medium py-3 px-7 rounded-full border-2 border-transparent hover:border-white transition duration-300'
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
