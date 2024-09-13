import React, { useState, useEffect } from 'react';
import moodleApi from '../api/moodle';
import { star } from '../assets';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const [transitioning, setTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch courses from Moodle
  const fetchCourses = async () => {
    try {
      const response = await moodleApi.get('/moodle/webservice/rest/server.php', {
        params: {
          wsfunction: 'core_course_get_courses_by_field',
          moodlewsrestformat: 'json',
        },
      });

      const coursesData = response.data.courses.map((course) => ({
        id: course.id,
        fullname: course.fullname,
        teacherName: course.contacts.length > 0 ? course.contacts[0].fullname : 'Unknown',
        imageUrl: course.courseimage || (course.overviewfiles[0]?.fileurl || ''),
      }));

      return coursesData;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  };

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

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await fetchCourses();
        console.log('Processed Courses Data:', coursesData); // Log the processed courses data
        setCourses(coursesData);
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    const loadCategories = async () => {
      await fetchCategories();
    };

    loadCourses();
    loadCategories();
  }, []);

  const handleNext = () => {
    if (currentIndex + 4 < courses.length) {
      setDirection('next');
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 4);
        setTransitioning(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex - 4);
        setTransitioning(false);
      }, 300);
    }
  };

  const displayedCourses = courses.slice(currentIndex, currentIndex + 4);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='mr-6 ml-6'>
      <h3 className='text-[2.3vw] text-red-900 font-bold mt-[1.5vw] font-serif'>
        A Range of Courses to Pick From
      </h3>
      <p className='text-[1.5vw] mt-[0.2vw] font-bold font-serif mb-2 text-gray-800'>
        Choose courses that suit you from a wide variety of categories
      </p>

      {/* Categories Section */}
      <div className='flex gap-4 mb-3 overflow-x-auto'>
        {categories.map((category) => (
          <div key={category.id} className='w-full py-[0.5vw] border-strathmore-grey text-center text-[1.08vw] text-gray-700 font-semibold hover:text-nav-blue hover:border-nav-blue cursor-pointer'>
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      <div className='border mr py-[3vw] flex justify-center relative'>
        <div
          className={`flex gap-[6vw] transition-transform duration-300 ${
            transitioning
              ? direction === 'next'
                ? 'transform -translate-x-full'
                : 'transform translate-x-full'
              : ''
          }`}
        >
          {displayedCourses.map((course) => (
            <div key={course.id} className="cursor-pointer p-3">
              <img
                src={course.imageUrl || ''}
                alt={course.fullname}
                className="h-[8vw] w-full object-cover mb-1"
              />
              <div className="text-center text-[1vw] font-bold mt-[0.5vw]">
                <p>{course.fullname}</p>
                <p>By {course.teacherName || 'Unknown'}</p>
                <div className="flex justify-center text-[0.8vw] my-[0.1vw]">
                  <p>5.0</p>
                  <div className="flex gap-[0.1vw] mt-[0.2vw] mx-[0.3vw]">
                    {[...Array(5)].map((_, idx) => (
                      <img key={idx} src={star} alt={`Star ${idx}`} className="h-[0.6vw]" />
                    ))}
                  </div>
                  <p className="text-strathmore-grey">(23,121)</p>
                </div>
                <p className="text-[0.8vw]">$74.69</p>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Button */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full hover:bg-gray-800 transition duration-300"
            style={{ marginLeft: '8px' }}
          >
            <FaChevronLeft size={20} />
          </button>
        )}

        {/* Next Button */}
        {currentIndex + 4 < courses.length && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full hover:bg-gray-800 transition duration-300"
            style={{ marginRight: '8px' }}
          >
            <FaChevronRight size={20} />
          </button>
        )}
      </div>

      <div className="relative flex flex-col items-center mt-[0.8vw]">
        <div className="w-[75vw] py-[2vw] flex justify-center overflow-hidden relative">
          {/* Additional content can be added here */}
        </div>
      </div>
    </div>
  );
};

export default Courses;
