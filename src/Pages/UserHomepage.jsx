import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../Components'; // Adjust the import path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { star,userhome1,userhome2, bigDataImage, pythonForDataScience, dataStructureimg } from '../assets';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {Footer} from '../Components';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
const UserHomepage = () => {
  const { user, loading, error } = React.useContext(AuthContext);
  if (user && user.enrolledCourses) {
    console.log('Enrolled Courses:', user.enrolledCourses);
    // Render the enrolled courses here
  }
  


  const Suggestions = [
    {
      id: 1,
      title: "Because You Viewed a Course in IT",
      courses: [
        { id: 3, title: "Course 3", instructor: "Instructor 3", duration: "8 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 4, title: "Course 4", instructor: "Instructor 4", duration: "10 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 5, title: "Course 5", instructor: "Instructor 5", duration: "6 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 6, title: "Course 6", instructor: "Instructor 6", duration: "1 hour", imageUrl: "https://via.placeholder.com/100" },
        { id: 7, title: "Course 7", instructor: "Instructor 7", duration: "2 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 8, title: "Course 8", instructor: "Instructor 8", duration: "5 hours", imageUrl: "https://via.placeholder.com/100" }
      ]
    },
    {
      id: 2,
      title: "Because they are popular now",
      courses: [
        { id: 9, title: "Course 9", instructor: "Instructor 9", duration: "12 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 10, title: "Course 10", instructor: "Instructor 10", duration: "7 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 11, title: "Course 11", instructor: "Instructor 11", duration: "9 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 12, title: "Course 12", instructor: "Instructor 12", duration: "6 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 13, title: "Course 13", instructor: "Instructor 13", duration: "8 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 14, title: "Course 14", instructor: "Instructor 14", duration: "5 hours", imageUrl: "https://via.placeholder.com/100" }
      ]
    },
    {
      id: 3,
      title: "Because they are taught by highly rated teachers",
      courses: [
        { id: 9, title: "Course 9", instructor: "Instructor 9", duration: "12 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 10, title: "Course 10", instructor: "Instructor 10", duration: "7 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 11, title: "Course 11", instructor: "Instructor 11", duration: "9 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 12, title: "Course 12", instructor: "Instructor 12", duration: "6 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 13, title: "Course 13", instructor: "Instructor 13", duration: "8 hours", imageUrl: "https://via.placeholder.com/100" },
        { id: 14, title: "Course 14", instructor: "Instructor 14", duration: "5 hours", imageUrl: "https://via.placeholder.com/100" }
      ]
    }
  ];

  const [sectionsState, setSectionsState] = useState(Suggestions.map(() => ({
    currentIndex: 0,
    transitioning: false,
    direction: null,
  })));

  const handleNextint = (index) => {
    const sectionCourses = Suggestions[index]?.courses;
    if (sectionsState[index].currentIndex + 4 < sectionCourses.length) { // Changed from 5 to 4
      setSectionsState((prevState) => {
        const newState = [...prevState];
        newState[index] = {
          ...newState[index],
          transitioning: true,
          direction: 'next',
        };
        return newState;
      });
      setTimeout(() => {
        setSectionsState((prevState) => {
          const newState = [...prevState];
          newState[index] = {
            ...newState[index],
            currentIndex: newState[index].currentIndex + 4, // Changed from 5 to 4
            transitioning: false,
          };
          return newState;
        });
      }, 300);
    }
  };
  
  const handlePrevious = (index) => {
    if (sectionsState[index].currentIndex > 0) {
      setSectionsState((prevState) => {
        const newState = [...prevState];
        newState[index] = {
          ...newState[index],
          transitioning: true,
          direction: 'prev',
        };
        return newState;
      });
      setTimeout(() => {
        setSectionsState((prevState) => {
          const newState = [...prevState];
          newState[index] = {
            ...newState[index],
            currentIndex: newState[index].currentIndex - 4, // Changed from 5 to 4
            transitioning: false,
          };
          return newState;
        });
      }, 300);
    }
  };

  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);
  let cont = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const [transitioning, setTransitioning] = useState(false);
  const initialIndices = Suggestions.reduce((acc, suggestion) => {
    acc[suggestion.id] = 0;
    return acc;
  }, {});

  const [currentIndices, setCurrentIndices] = useState(initialIndices);
  const [transitioningIndices, setTransitioningIndices] = useState({});
  
  const sliderData = [
    {
      backgroundImage: "url-to-image1",
      title: "Welcome Back Cliff",
      subtitle: "Keep learning at a steady pace"
    },
    {
      backgroundImage: "url-to-image2",
      title: "Hello Cliff",
      subtitle: "Keep learning at a steady pace"
    }
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (cont.current === 0) {
        slider1Ref.current.style.display = 'none';
        slider2Ref.current.style.display = 'block';
        cont.current = 1;
      } else {
        slider1Ref.current.style.display = 'block';
        slider2Ref.current.style.display = 'none';
        cont.current = 0;
      }
    }, 8000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  

  
 

  

  const handlePrev = () => {
    clearInterval();
    if (cont.current === 1) {
      slider1Ref.current.style.display = 'block';
      slider2Ref.current.style.display = 'none';
      cont.current = 0;
    } else {
      slider2Ref.current.style.display = 'block';
      slider1Ref.current.style.display = 'none';
      cont.current = 1;
    }
  };

  const handleNext = () => {
    clearInterval();
    if (cont.current === 0) {
      slider1Ref.current.style.display = 'none';
      slider2Ref.current.style.display = 'block';
      cont.current = 1;
    } else {
      slider2Ref.current.style.display = 'none';
      slider1Ref.current.style.display = 'block';
      cont.current = 0;
    }
  };
 
  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Data Structures",
      instructor: "Kim",
      duration: "10 hours",
      imageUrl: dataStructureimg
    },
    {
      id: 2,
      title: "Python for Datascience",
      instructor: "John Doe",
      duration: "12 hours",
      imageUrl: pythonForDataScience
    },
    {
      id: 3,
      title: "Big Data",
      instructor: "Joel Jim",
      duration: "8 hours",
      imageUrl: bigDataImage
    }
  ];

  
  

  
  

  return (
    <div className="mt-0 ">
    <Header isLoggedIn={true} /> {/* Show the logged-in user navbar */}
    <div className="w-full mt-0 relative">
      <div className="sliderAx w-full h-auto relative">
        <div ref={slider1Ref} className="w-full h-auto">
          <div
            className="bg-cover bg-center h-auto text-white py-16 px-6 sm:py-24 sm:px-10 object-fill"
            style={{
              backgroundImage:
                `url(${userhome1})`,
            }}
          >
            <div className="md:w-1/2">
              
            <p className='text-[1.8vw] mt-[0.5] font-serif  font-bold text-white '>Welcome Back {user.username}</p>
              <p className='text-[1.5vw] mt-[0.5] font-serif  font-bold text-white '>
                Keep learning at a steady pace
              </p>
              
            </div>
          </div>
          <br />
        </div>
  
        <div ref={slider2Ref} className="w-full h-auto hidden">
          <div
            className="bg-cover bg-top h-auto text-white py-16 px-6 sm:py-24 sm:px-10 object-fill"
            style={{
              backgroundImage:
              `url(${userhome2})`,
            }}
          >
            
            <p className='text-[1.8vw] mt-[0.5] font-serif  font-bold text-white '>Hello {user.username}</p>
            <p className='text-[1.5vw] mt-[0.5] font-serif  font-bold text-white '>
            Keep learning at a steady pace
            </p>
           
          </div>
          <br />
        </div>
  
        <div className="absolute inset-y-1/2 left-0 transform -translate-y-1/2">
          <button onClick={handlePrev} className="text-white text-2xl sm:text-4xl">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div className="absolute inset-y-1/2 right-0 transform -translate-y-1/2">
          <button onClick={handleNext} className="text-white text-2xl sm:text-4xl">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
  
      <div className="w-full h-auto relative px-4">
        <div className="w-full h-auto relative">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
        <p className="text-[1.5vw] mt-[0.5] font-serif font-bold text-gray-800">
          Continue from where you left
        </p>
        <Link to="/mylearning" className="text-[1.0vw] mt-[0.5] font-serif hover:cursor-pointer font-bold text-gray-800">
          Track <span className="text-blue-600">Progress</span>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-4">
  {user.enrolledCourses.map((course) => (
    <Link
    to={`/coursepage/${course.id}/${course.fullname}`} // Pass the course ID as a parameter
      key={course.id}
      className="flex border cursor-pointer border-gray-300 w-full sm:w-96 h-36"
    >
      {/* Image Container */}
      <div className="relative w-1/3 h-full flex-shrink-0 group">
  <img
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    src={course.courseimage}
    alt="Course"
  />
  {/* Play Icon */}
  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <svg
      className="w-6 h-6 sm:w-10 sm:h-10 text-white bg-black bg-opacity-50 rounded-full p-1 sm:p-2 transition-transform duration-300 transform group-hover:scale-125"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  </div>


      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center pl-2 sm:pl-4 border-l border-gray-400 w-2/3">
        <p className="text-[0.8vw] mt-[0.5] font-serif font-bold text-gray-700">{course.fullname}</p>
        <p className="text-[0.8vw] mt-[0.5] font-serif font-bold text-gray-700">{course.instructor}</p>
        <p className="text-[0.7vw] mt-[0.5] font-serif font-bold text-gray-700">{course.duration}</p>
      </div>
    </Link>
  ))}
</div>
  
           <p className='text-[1.5vw] mt-[2vw] font-serif  font-bold text-gray-800 '> Suggested for you
          </p>
        </div>
  
        <div className="w-full justify-center overflow-hidden relative">
          <div
            className={`w-full transition-transform duration-600 gap-2 sm:gap-[8vw] ${
              transitioning
                ? direction === 'next'
                  ? 'transform -translate-x-full'
                  : 'transform translate-x-full'
                : ''
            }`}
          >
           {Suggestions.map((suggestion, index) => (
          <div key={suggestion.id} className="w-full  h-auto mb-6 sm:mb-10 relative">
             <p className='text-[1.2vw] mt-[1.5vw] font-serif  font-bold text-black '>{suggestion.title}</p>
            <div className="relative w-full ">
              <div
                className={`flex w-full gap-2 sm:gap-4 transition-transform duration-400 ${
                  sectionsState[index].transitioning
                    ? sectionsState[index].direction === 'next'
                      ? 'transform translate-x-[-100%]'
                      : 'transform translate-x-[100%]'
                    : ''
                }`}
              >
                {suggestion.courses
                  .slice(
                    sectionsState[index].currentIndex,
                    sectionsState[index].currentIndex + 5
                  )
                  .map((course) => (
                    <div key={course.id} className="w-full sm:w-1/5 flex-shrink-0 cursor-pointer">
                      <img
                        src={course.image || bigDataImage}
                        alt={course.title}
                        className="h-20 sm:h-[9vw] w-full object-cover"
                      />
                      <div className="text-center text-xs sm:text-[1vw] font-bold mt-2 sm:mt-[0.7vw]">
                        <p>{course.title}</p>
                        <p>By {course.instructor?.name || 'Unknown'}</p>
                        <div className="flex justify-center text-xs sm:text-[0.8vw] my-1 sm:my-[0.2vw]">
                          <p>5.0</p>
                          <div className="flex gap-1 sm:gap-[0.2vw] mt-1 sm:mt-[0.25vw] mx-2 sm:mx-[0.5vw]">
                            {[...Array(5)].map((_, idx) => (
                              <img
                                key={idx}
                                src={star}
                                alt={`Star ${idx}`}
                                className="h-3 sm:h-[0.9vw] w-3 sm:w-[0.9vw]"
                              />
                            ))}
                          </div>
                          <p>10k Ratings</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {sectionsState[index].currentIndex > 0 && (
                <button
                  onClick={() => handlePrevious(index)}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition duration-300"
                >
                  <FaChevronLeft size={20} />
                </button>
              )}
              {sectionsState[index].currentIndex + 5 < suggestion.courses.length && (
                <button
                  onClick={() => handleNextint(index)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition duration-300"
                >
                  <FaChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
              </div>
              <Footer/>
            </div>
          </div>
       
);
};

export default UserHomepage;
