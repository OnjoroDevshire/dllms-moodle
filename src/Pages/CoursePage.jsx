import React, { useState } from 'react';
import { Header } from '../Components';
import { FaStar, FaTimes } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import {Footer} from '../Components';

const CoursePage = () => {
  const stars = [<FaStar key="1" />, <FaStar key="2" />, <FaStar key="3" />, <FaStar key="4" />, <FaStar key="5" />];

  const overviewData = [
    {
      title: "Overview of Python",
      subTitle: ["History of Python", "Why Python is Popular", "Applications of Python", "Installing Python"]
    },
    {
      title: "Basic Syntax",
      subTitle: ["Syntax"]
    },
    {
      title: "Control Flow",
      subTitle: ["flowing"]
    }
  ];

  const [isContentVisible, setIsContentVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(''); // State to manage active tab

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Header isLoggedIn={true} />

      <div className='w-full'>
        <div className='ml-[5.6vw] mr-[5.6vw] flex gap-[3vw]'>
          <div className={`flex-grow ${isContentVisible ? 'w-[60%]' : 'w-full'} transition-all duration-300`}>
            <p className='py-[1.5vw] text-[1.1vw] font-semibold text-strathmore-grey'>
              From the Course: <span className='text-nav-blue'>Data Science</span>
            </p>

            <div className='relative h-[32.95vw] bg-black'>
              <ReactPlayer
                url='https://github.com/MartinMbote/elearning-platform/raw/main/src/assets/bikeRide.mp4'
                width='100%'
                height='100%'
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload'
                    }
                  },
                  attributes: {
                    controls: true
                  }
                }}
              />

              {!isContentVisible && (
                <div className='absolute top-[0.5vw] right-[1vw]'>
                  <div
                    className='w-[13.5vw] h-[2.8vw] bg-black text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white'
                    onClick={toggleContentVisibility}
                  >
                    <p>Course Content</p>
                  </div>
                </div>
              )}
            </div>

            <div className='border w-full pl-[3vw] pt-[0.5vw] pb-[1.4vw]'>
              <p className='text-[1.7vw] font-semibold'>
                Introduction to Python
              </p>

              <p className='text-[1vw] text-strathmore-grey font-semibold'>
                From the Course: <span className='text-nav-blue'>Data Science</span>
              </p>

              <div className='w-[13.5vw] h-[2.8vw] bg-black text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white mt-[0.5vw]'>
                <p>Start my 1-month free trial</p>
              </div>

              <div className='flex justify-between mt-4 w-full'>
  <p className='cursor-pointer flex-grow text-center' onClick={() => handleTabClick('notes')}>Notes</p>
  <p className='cursor-pointer flex-grow text-center' onClick={() => handleTabClick('reviews')}>Reviews</p>
  <p className='cursor-pointer flex-grow text-center' onClick={() => handleTabClick('instructor')}>Instructor</p>
  <p className='cursor-pointer flex-grow text-center' onClick={() => handleTabClick('assignments')}>Assignments</p>
</div>


              {/* Conditional rendering based on active tab */}
              {activeTab === 'notes' && <div>Notes content goes here</div>}
              {activeTab === 'reviews' && <div>Reviews content goes here</div>}
              {activeTab === 'instructor' && <div>Instructor content goes here</div>}
              {activeTab === 'assignments' && <div>Assignments content goes here</div>}
            </div>
          </div>

          {isContentVisible && (
            <div className='w-[40%] bg-white p-[1vw] h-[32.95vw] mt-[4.7vw] ml-[-3.45%] border border-gray-300 shadow-lg rounded-lg relative'>
              <button
                className='absolute top-[1vw] right-[1vw] text-[1.5vw] text-gray-600 hover:text-black focus:outline-none'
                onClick={toggleContentVisibility}
              >
                <FaTimes />
              </button>
              <h3 className='text-[1.4vw] font-semibold mb-[1vw] text-gray-800'>Lessons</h3>
              <ul className='text-[1.1vw] text-gray-700'>
                {overviewData.map((lesson, index) => (
                  <li key={index} className='mt-[1vw]'>
                    <label className='flex items-center cursor-pointer'>
                      <input
                        type='checkbox'
                        className='form-checkbox text-blue-600 h-[1.2vw] w-[1.2vw] border-gray-300 rounded mr-[0.8vw]'
                      />
                      <span className='font-semibold text-gray-800'>{lesson.title}</span>
                    </label>
                    <ul className='ml-[2vw] mt-[0.5vw]'>
                      {lesson.subTitle.map((sub, idx) => (
                        <li key={idx} className='flex items-center mt-[0.4vw]'>
                          <input
                            type='checkbox'
                            className='form-checkbox text-blue-600 h-[1vw] w-[1vw] border-gray-300 rounded mr-[0.8vw]'
                          />
                          <span className='text-gray-700'>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default CoursePage;
