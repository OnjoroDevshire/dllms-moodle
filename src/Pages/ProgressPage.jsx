import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header, Footer } from '../Components';
import { bigDataImage, pythonForDataScience, dataStructureimg } from '../assets';

const ProgressPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchActivityCompletionStatus = async (courseId, token) => {
    if (!courseId || !token) {
      console.error('Missing courseId or token');
      return [];
    }

    const params = {
      wsfunction: 'core_completion_get_activities_completion_status',
      moodlewsrestformat: 'json',
      wstoken: token,
      courseid: courseId
    };

    try {
      const response = await axios.get('http://localhost/moodle/webservice/rest/server.php', { params });
      console.log('Activity Completion Status Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching activity completion status:', error);
      throw new Error('Error fetching activity completion status.');
    }
  };

  const calculateCourseProgress = (activities) => {
    if (!Array.isArray(activities)) {
      console.error('Invalid activities data:', activities);
      return 0;
    }

    const totalActivities = activities.length;
    const completedActivities = activities.filter(activity => activity.completed).length;
    const progress = (completedActivities / totalActivities) * 100;
    return progress.toFixed(2); // Returns the progress percentage
  };

  useEffect(() => {
    const fetchCourseProgress = async () => {
      const token = localStorage.getItem('moodleToken');

      if (!token) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }

      const userId = getUserId();  // Fetch the user ID dynamically

      if (!userId) {
        setError('User ID is not available.');
        setLoading(false);
        return;
      }

      const params = {
        wsfunction: 'core_course_get_enrolled_courses_by_timeline_classification',
        moodlewsrestformat: 'json',
        classification: 'inprogress',
        wstoken: token,
        customfieldname: 'id',
        customfieldvalue: userId,
      };

      try {
        const response = await axios.get('http://localhost/moodle/webservice/rest/server.php', { params });
        if (response.data.courses && Array.isArray(response.data.courses)) {
          const coursesData = await Promise.all(response.data.courses.map(async (course) => {
            const activities = await fetchActivityCompletionStatus(course.id, token);
            const progress = calculateCourseProgress(activities);

            return {
              id: course.id,
              title: course.fullname,
              imageUrl: course.courseimage || getImageUrl(course.fullname),
              progress: `${progress}%`,
              viewUrl: course.viewurl,
            };
          }));
          setCourses(coursesData);
        } else {
          setError('Invalid API response.');
        }
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        setError('Error fetching course progress.');
        setLoading(false);
      }
    };

    fetchCourseProgress();
  }, []);

  const getUserId = () => {
    // Logic to fetch or determine the user ID dynamically
    return '7159'; // Replace with actual logic to get user ID
  };

  const getImageUrl = (title) => {
    switch (title) {
      case "Data Analytics":
        return dataStructureimg;
      case "Python for Data Science":
        return pythonForDataScience;
      case "Big Data":
        return bigDataImage;
      default:
        return bigDataImage;  // Default image if no match
    }
  };

  const handleCourseClick = (courseUrl) => {
    window.open(courseUrl, '_blank');  // Open course URL in a new tab
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header isLoggedIn={true} />
      <div className="min-h-screen text-gray-700 p-6">
        <h1 className="text-[1.2vw] mt-[0.5vw] font-serif mb-5 font-bold text-black">
          Your Enrolled Courses
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex border p-4 border-gray-300 bg-white overflow-hidden shadow-md cursor-pointer"
              onClick={() => handleCourseClick(course.viewUrl)}
            >
              <div className="relative w-1/3 h-full flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={course.imageUrl}
                  alt="Course"
                />
              </div>

              <div className="flex flex-col justify-center pl-4 border-l border-gray-400 w-2/3">
                <p className='text-[0.8vw] mt-[0.5] font-serif font-bold text-black'>{course.title}</p>
                <p className='text-[0.7vw] mt-[1] text-gray-600'> Complete: {course.progress}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgressPage;
