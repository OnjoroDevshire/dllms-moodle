import React, { useState, useEffect } from 'react';
import moodleApi from '../api/moodle';
import { star } from '../assets';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const fetchCourseOverviewFiles = async (courseId) => {
  try {
    const response = await moodleApi.get('/moodle/webservice/rest/server.php', {
      params: {
        wsfunction: 'core_course_get_course_overviewfiles',
        courseid: courseId,
        moodlewsrestformat: 'json',
      },
    });

    if (response.data && Array.isArray(response.data)) {
      // Extract image URLs
      const imageUrls = response.data
        .filter(file => file.mimetype.startsWith('image/'))
        .map(file => file.fileurl);

      console.log(`Fetched image URLs for course ${courseId}:`, imageUrls);
      return imageUrls;
    }

    console.log(`No image URLs found for course ${courseId}`);
    return [];
  } catch (err) {
    console.error('Error fetching course overview files:', err);
    return [];
  }
};

const fetchTeacherInfo = async (teacherIds) => {
  try {
    const response = await moodleApi.get('/moodle/webservice/rest/server.php', {
      params: {
        wsfunction: 'core_user_get_users',
        userids: teacherIds.join(','), // Join IDs if multiple
        moodlewsrestformat: 'json',
      },
    });

    console.log('Teacher Info Response:', response.data); // Verify the response data
    return response.data;
  } catch (err) {
    console.error('Error fetching teacher info:', err);
    return [];
  }
};

const fetchCourses = async () => {
  try {
    const response = await moodleApi.get('/moodle/webservice/rest/server.php', {
      params: {
        wsfunction: 'core_course_get_courses',
        moodlewsrestformat: 'json',
      },
    });

    const coursesData = Array.isArray(response.data) ? response.data : [];
    const teacherIds = Array.from(new Set(coursesData.flatMap(course => course.teachers || [])));

    console.log('Teacher IDs:', teacherIds);

    // Fetch teacher info if there are teacher IDs
    const teachers = teacherIds.length > 0 ? await fetchTeacherInfo(teacherIds) : [];

    console.log('Fetched Teachers:', teachers);
    console.log('Courses Data:', coursesData);

    // Create a map of teachers for quick lookup
    const teachersMap = Array.isArray(teachers) ? teachers.reduce((map, teacher) => {
      map[teacher.id] = teacher.fullname;
      return map;
    }, {}) : {};

    // Process each course to include image URL and teacher info
    const processedCourses = await Promise.all(
      coursesData.map(async (course) => {
        // Fetch image URLs for the course
        const imageUrls = await fetchCourseOverviewFiles(course.id);
        const imageUrl = imageUrls[0] || ''; // Use the first image or default

        // Find the teacher name using the teacher ID
        const teacherName = course.teachers && course.teachers.length
          ? teachersMap[course.teachers[0]] || 'Unknown'
          : 'Unknown';

        return {
          ...course,
          imageUrl: imageUrl,
          teacherName: teacherName,
        };
      })
    );

    return processedCourses;
  } catch (err) {
    console.error('Error fetching courses:', err.response ? err.response.data : err.message);
    throw new Error('Failed to fetch courses');
  }
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const [transitioning, setTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    loadCourses();
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
    <h3 className='text-[2vw] font-bold mt-[1.5vw] font-serif'>
      A Range of Courses to Pick From
    </h3>
    <p className='text-[1vw] mt-[0.2vw] font-serif mb-2'>
      Choose courses that suit you from a wide variety of categories
    </p>
    <div className='flex mt-[0.5vw]'>
      <p className='font-serif text-[0.8vw] mt-[1vw] font-bold text-black hover:text-gray-700 ml-1'>
        Python
      </p>
      <p className='font-serif text-[0.8vw] mt-[1vw] font-bold text-black hover:text-gray-700 ml-1'>
        Web Development
      </p>
      <p className='font-serif text-[0.8vw] mt-[1vw] font-bold text-black hover:text-gray-700 ml-1'>
        Data Science
      </p>
    </div>
  
    <div className='w-full border border-gray-300 mt-6 mb-4 relative'>
      <p className='font-serif text-[1.5vw] mt-[1.5vw] font-bold text-black ml-[6vw]'>
        Top Courses
      </p>
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
          <div key={course.id} className="cursor-pointer p-3 ">
            <img
              src={course.imageUrl || ''} 
              alt={course.fullname} 
              className="h-[8vw] w-full object-cover rounded-lg mb-1"
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
