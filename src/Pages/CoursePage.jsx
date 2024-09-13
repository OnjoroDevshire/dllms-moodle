import React, { useState, useContext ,useEffect} from 'react';
import { Header, Footer } from '../Components';
import { FaStar, FaTimes } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moodleApi from '../api/moodle';
import { FaFilePdf } from 'react-icons/fa';

 
const reviewsData = [
  {
    name: "John Doe",
    role: "Founder of Rubik",
    image: "https://readymadeui.com/team-2.webp",
    rating: 4,
    review: "The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt."
  },
  {
    name: "Mark Adair",
    role: "Founder of Alpha",
    image: "https://readymadeui.com/team-1.webp",
    rating: 5,
    review: "Excellent service and quick delivery. Highly recommend!"
  },
  {
    name: "Simon Konecki",
    role: "Founder of Labar",
    image: "https://readymadeui.com/team-4.webp",
    rating: 4.5,
    review: "Great experience. Very satisfied with the service and quality."
  }
];
const Reviews = () => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return (
      <>
        {Array(fullStars).fill(
          <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
          </svg>
        )}
        {halfStar ? (
          <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
          </svg>
        ) : null}
        {Array(emptyStars).fill(
          <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
          </svg>
        )}
      </>
    );
  };

  const reviewsData = [
    // Sample review data
    {
      image: 'https://www.svgrepo.com/show/311063/person.svg',
      name: 'Jane Doe',
      role: 'Student',
      rating: 4.5,
      review: 'Great course! Learned a lot.',
    },
    {
      image: 'https://www.svgrepo.com/show/311063/person.svg',
      name: 'John Smith',
      role: 'Student',
      rating: 5,
      review: 'Excellent content and great instructor.',
    },
    {
      image: 'https://www.svgrepo.com/show/311063/person.svg',
      name: 'Alice Johnson',
      role: 'Student',
      rating: 4,
      review: 'Very informative, but could use more examples.',
    },
    {
      image: 'https://www.svgrepo.com/show/311063/person.svg',
      name: 'Bob Brown',
      role: 'Student',
      rating: 3.5,
      review: 'Good course, but some topics were too basic.',
    },
    // Add more reviews here
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <FaArrowLeft className="slick-prev text-red-500" />, // Change color here
    nextArrow: <FaArrowRight className="slick-next text-blue-500" />, // Change color here
  };
  
  return (
    <div className="font-[sans-serif] bg-white">
      <h2 className="font-semibold text-xl mb-4 text-center font-serif text-gray-800">Reviews</h2>
      <div className="mt-4 max-w-6xl mx-auto">
        <Slider {...settings}>
          {reviewsData.map((review, index) => (
            <div key={index} className="p-4 bg-gray-50 relative mx-3">
              <div className="flex items-center gap-12">
                <img src={review.image} className="w-14 h-14 rounded-full border-4 border-white" alt={review.name} />
                <div>
                  <h4 className="text-gray-800 text-sm font-bold">{review.name}</h4>
                  <p className="mt-0.5 text-xs text-gray-600">{review.role}</p>
                </div>
              </div>
              <div className="flex space-x-1 mt-4 justify-center">
                {renderStars(review.rating)}
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-800 text-sm leading-relaxed">{review.review}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  
  
  );
};


// Component for Instructor tab content
const Instructor = () => {
  const instructor = {
    name: "Cliff User",
    bio: "Cliff User has over 10 years of experience in teaching software development. He specializes in React, Django, and full-stack development.",
    email: "Clifordon@ueab.ac.ke",
    experience: 10,
    specialization: "IT teacher",
    image: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/efd45799-506f-4863-ad1a-3c26ac7af6f8/bf39ea36-0be2-4d7c-83f6-1d3d7adc7c95.png" // Add the profile picture URL here
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="font-semibold text-xl mb-4 text-center text-blue-600">Instructor</h2>
      <div className="flex flex-col items-center">
        {/* Display the profile picture */}
        <img
          src={instructor.image}
          alt={instructor.name}
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-600"
        />
        <h3 className="font-semibold text-lg text-center text-blue-600">{instructor.name}</h3>
        <p className="text-center text-gray-700 mt-2">{instructor.bio}</p>
        <div className="mt-4 text-center text-gray-800">
          <p>
            Email:{" "}
            <a href={`mailto:${instructor.email}`} className="text-blue-500 hover:underline">
              {instructor.email}
            </a>
          </p>
          <p>Experience: {instructor.experience} years</p>
          <p>Specialization: {instructor.specialization}</p>
        </div>
      </div>
    </div>
  );
};



const calculateTimeRemaining = (expiresAt) => {
  const now = new Date();
  const expirationDate = new Date(expiresAt);
  const timeDiff = expirationDate - now;

  if (timeDiff <= 0) return "Expired";

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days} days, ${hours} hours, ${minutes} minutes`;
};



const CoursePage = () => {
  const { courseId, courseName } = useParams();
  const [videourl, setvideourl] = useState('https://www.youtube.com/watch?v=j3US7x4yqkw');
  const [courseContent, setCourseContent] = useState(null);
  const [exams, setExams] = useState([]); // Initialize state for exams
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const response = await moodleApi.get('/moodle/webservice/rest/server.php', {
          params: {
            wsfunction: 'core_course_get_contents',
            moodlewsrestformat: 'json',
            courseid: courseId,
          },
        });
        setCourseContent(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load course content');
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseContent();
    }
  }, [courseId]);

  // Fetch exams related to the course
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await moodleApi.get('/moodle/webservice/rest/server.php', {
          params: {
            wsfunction: 'mod_quiz_get_quizzes_by_courses',
            courseids: [courseId],
            moodlewsrestformat: 'json',
          },
        });
        console.log(res.data); // Add this line to check the API response
        setExams(res.data.quizzes);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
    
  }, [activeTab, courseId]);

  // Handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCheckboxChange = (chapterId) => {
    const selectedChapter = courseContent.find((chapter) => chapter.id === chapterId);
    if (selectedChapter) {
      setSelectedChapter(selectedChapter);
      const videoModule = selectedChapter.modules.find((module) => module.modname === 'url');
      if (videoModule && videoModule.contents && videoModule.contents.length > 0) {
        setvideourl(videoModule.contents[0].fileurl);
      } else {
        setvideourl('');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading course content: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} />
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className={`flex-grow ${isContentVisible ? 'lg:w-3/5' : 'w-full'} transition-all duration-200 ease-in-out`}>
            <p className="text-lg sm:text-xl md:text-2xl mt-2 font-serif mb-5 font-bold text-black">
              From the Course: <span className="text-blue-600">{courseName}</span>
            </p>
            {/* Video Player */}
            <div className="relative h-[50vw] sm:h-[40vw] md:h-[32vw] bg-black">
              {videourl ? (
                <ReactPlayer url={videourl} width="100%" height="100%" controls />
              ) : (
                <p>No video available</p>
              )}
            </div>

            {/* Course Description */}
            <div className="border w-full p-4 sm:p-6">
              <p className="text-lg sm:text-xl md:text-2xl mt-2 font-serif mb-5 font-semibold text-black">
                Introduction to {courseName}
              </p>

              {/* Tabs */}
              <div className="w-full flex flex-col sm:flex-row justify-center mt-4">
                <div className="flex flex-wrap justify-center w-full sm:w-[50vw] lg:w-[60vw] gap-4 sm:gap-8 border-b-2 border-blue-600">
                  {['notes', 'reviews', 'instructor', 'content'].map((tab) => (
                    <p
                      key={tab}
                      className={`cursor-pointer flex-grow text-center text-md sm:text-lg md:text-xl font-serif font-semibold transition-colors duration-300 ${
                        activeTab === tab
                          ? 'text-white bg-blue-600 rounded-t-md shadow-lg'
                          : 'text-blue-600 hover:text-blue-500 hover:bg-purple-100'
                      }`}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </p>
                  ))}
                </div>
              </div>

              {/* Conditional rendering based on active tab */}
              <div className="mt-4 flex justify-center items-center">
                {activeTab === 'notes' && <Notes chapter={selectedChapter} />}
                {activeTab === 'reviews' && <Reviews />}
                {activeTab === 'instructor' && <Instructor />}
                {activeTab === 'content' && <Content courseContent={courseContent} handleCheckboxChange={handleCheckboxChange} exams={exams} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Content = ({ courseContent, handleCheckboxChange, exams }) => {
  const [expandedChapter, setExpandedChapter] = useState(null);

  const toggleChapter = (chapterId) => {
    if (expandedChapter === chapterId) {
      setExpandedChapter(null);
    } else {
      setExpandedChapter(chapterId);
    }
  };

  return (
    <div>
    {courseContent.map((chapter) => (
      <div key={chapter.id} className="mb-8">
        {/* Chapter with Checkbox */}
        <div className="flex items-center justify-between mb-2 border-t-[0.15vw] py-[1.8vw] text-[1.1vw] font-semibold pl-[2vw] cursor-pointer">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={chapter.completed}
              onChange={() => handleCheckboxChange(chapter.id)}
              className="h-5 w-5 mr-4 border-gray-300 rounded focus:ring-0 checked:bg-gray-800"
            />
            <h2 className="text-gray-800">{chapter.name}</h2>
          </div>
  
          {/* Dropdown Icon */}
          <button onClick={() => toggleChapter(chapter.id)}>
            {expandedChapter === chapter.id ? (
              <FaChevronUp className="text-gray-600" />
            ) : (
              <FaChevronDown className="text-gray-600" />
            )}
          </button>
        </div>
  
        {/* Expanded Chapter Content */}
        {expandedChapter === chapter.id && (
          <div style={{ width: '300px' }} className="ml-9 mt-2"> {/* Inline style for fixed width */}
            {chapter.videoUrl && (
              <div className="mb-4">
                <video controls width="100%" src={chapter.videoUrl}>
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
  
            {chapter.modules.map((module) => (
              <p key={module.id} className="text-gray-600 font-medium">
                <span className="text-blue-600 font-semibold">Course Activity: </span>
  
                {/* Check the module type (e.g., quiz, assignment, resource) */}
                {module.modname === 'assign' && (
                  <Link to={`/assignment/${module.id}`} className="text-gray-700 hover:underline">
                    {module.name}
                  </Link>
                )}
  
                {module.modname === 'quiz' && (
                  <Link to={`/exam/${module.id}`} className="text-gray-700 hover:underline">
                    {module.name}
                  </Link>
                )}
  
                {module.modname === 'resource' && (
                  <Link to={`/resource/${module.id}`} className="text-gray-700 hover:underline">
                    {module.name}
                  </Link>
                )}
  
                {/* Add more conditions for other types like forums, lessons, etc. */}
                {module.modname === 'forum' && (
                  <Link to={`/forum/${module.id}`} className="text-gray-700 hover:underline">
                    {module.name} (Forum)
                  </Link>
                )}
  
                {/* Default case if no specific type is matched */}
                {!['assign', 'quiz', 'resource', 'forum'].includes(module.modname) && (
                  <span>{module.name} (Unknown Activity Type)</span>
                )}
              </p>
            ))}
  
            {exams.map((exam) => (
              <p key={exam.id} className="text-gray-600 font-medium">
                <span className="text-blue-600 font-semibold">Exam: </span>
                <Link to={`/exam/${exam.id}`} className="text-gray-700 hover:underline">
                  {exam.name}
                </Link>
              </p>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
  
  

  );
};


export default CoursePage;
