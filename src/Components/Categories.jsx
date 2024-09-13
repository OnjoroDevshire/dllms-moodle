import React, { useState, useEffect } from 'react';
import moodleApi from '../api/moodle'; // Ensure the path is correct
import { FaChevronLeft, FaChevronRight, FaBook, FaUser, FaLaptop, FaGraduationCap } from 'react-icons/fa'; // Add FaGraduationCap

const categoryIcons = {
  "Education": <FaBook />,
  "Technology": <FaLaptop />,
  "People": <FaUser />,
  // Add more mappings as needed
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // Function to fetch categories from the Moodle API
  const fetchCategories = async () => {
    try {
      const response = await moodleApi.get('/moodle/webservice/rest/server.php', {
        params: {
          wsfunction: 'core_course_get_categories', // Ensure this is the correct Moodle function
          moodlewsrestformat: 'json',
        },
      });

      // Process the response data to extract categories
      const categoriesData = response.data; // Ensure response.data contains the categories array
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

  // Handle the next button click
  const handleNext = () => {
    if (currentIndex + 4 < categories.length) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 4);
        setTransitioning(false);
      }, 300);
    }
  };

  // Handle the previous button click
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex - 4);
        setTransitioning(false);
      }, 300);
    }
  };

  // Slice the categories for pagination
  const displayedCategories = categories.slice(currentIndex, currentIndex + 4);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='relative w-full bg-blue-50 p-12'>
      <div className='w-full bg-blue-50 h-[2vw]'>
        <p className='text-[1.5vw] mt-[0.5] font-serif font-bold text-gray-800'>
          Top Categories
        </p>
      </div>

      <div className='flex justify-center mt-[2vw] mb-[3vw]'>
        <div className='w-[80vw] flex flex-wrap gap-[2vw] justify-center'>
          {displayedCategories.map((category, index) => (
            <button
              key={index}
              className='bg-blue-500 text-white text-[1.5vw] font-semibold mt-[0.6vw] flex flex-col items-center justify-center w-36 h-36 rounded-md border-2 border-transparent hover:border-white transition duration-300'
            >
              <div className='text-[2vw] mb-2 '>
                {categoryIcons[category.name] || <FaGraduationCap className='text-gray-500'/>} {/* Default icon if category not found */}
              </div>
              <span className='text-xs'>{category.name}</span> {/* Adjust the text size if needed */}
            </button>
          ))}
        </div>
      </div>

      {/* Previous Button */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-800 transition duration-300"
          style={{ marginLeft: '8px' }}
        >
          <FaChevronLeft size={20} />
        </button>
      )}

      {/* Next Button */}
      {currentIndex + 4 < categories.length && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-800 transition duration-300"
          style={{ marginRight: '8px' }}
        >
          <FaChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default Categories;
