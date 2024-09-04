import React from 'react';
import { Header, Footer } from '../Components';

const ProgressPage = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to Python",
      instructor: "John Doe",
      duration: "10 hours",
      progress: 75,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Advanced React",
      instructor: "Jane Smith",
      duration: "8 hours",
      progress: 40,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Data Science Basics",
      instructor: "Michael Brown",
      duration: "15 hours",
      progress: 60,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Machine Learning",
      instructor: "Emily White",
      duration: "12 hours",
      progress: 90,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Web Development",
      instructor: "Chris Green",
      duration: "20 hours",
      progress: 50,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      title: "Cybersecurity Essentials",
      instructor: "David Black",
      duration: "10 hours",
      progress: 30,
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div>
      <Header />
      <div className="min-h-screen text-gray-700 p-6">
        <h1 className="text-3xl font-bold text-light-blue mb-6">Your Enrolled Courses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="flex border border-gray-500 bg-white rounded-lg overflow-hidden shadow-md">
              {/* Image Container */}
              <div className="relative w-1/3 h-full flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={course.imageUrl}
                  alt="Course"
                />
                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-10 sm:h-10 text-white bg-black bg-opacity-50 rounded-full p-1 sm:p-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center pl-4 border-l border-gray-400 w-2/3">
                <p className="text-sm font-semibold text-light-blue">{course.title}</p>
                <p className="text-xs text-gray-300">{course.instructor}</p>
                <p className="text-xs text-gray-300">{course.duration}</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <div
                      className="bg-purple-700 h-2.5 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{course.progress}% Complete</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProgressPage;
