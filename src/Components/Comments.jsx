import React, { useState } from 'react';
import { commentImage } from '../assets';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Comments = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselData = [
    {
      image: commentImage,
      Usercomment: "We are having a lot of positive feedback about our new LMS. It is so exciting to have such great results from our employees. Recently we received a suggestion from a supervisor for Winterwood. She requested access to see her employee activity results for the team of managers she supervises and eLeaP had this feature right there.",
      commentator: "Jane Doe",
      info: "Global Head of Capability Development",
      company: "Company X",
      position: "Marketing Manager"
    },
    {
      image: commentImage,
      Usercomment: "Test 2",
      commentator: "Test 2",
      info: "Global Head of",
      company: "Company",
      position: "Manager"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1));
  };

  return (
    <div className='relative'>
      <div className=' bg-white bg-opacity-20 pt-[4.5vw] pb-[3vw] px-[3vw] flex mb-[5vw]'>
        <button
          className='absolute left-0 bg-white rounded-full p-2 text-black hover:bg-gray-200'
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          onClick={handlePrev}
        >
          <FaChevronLeft className='text-[2vw]' />
        </button>

        <div className='flex gap-[3vw] ml-[15vw]'>
          <img src={carouselData[currentIndex].image} className='h-[16vw] rounded-[10vw] mt-[1.5vw]' alt='Comment' />
          <div className='w-[33vw] text-[1.05vw] mt-[1vw]'>
            <div>
              <p className='text-gray-700 font-semibold leading-[1.7vw]'>
                {carouselData[currentIndex].Usercomment}
              </p>
              <div className='text-center mt-[2vw] leading-[2vw]'>
                <p className='font-bold'>{carouselData[currentIndex].commentator}</p>
                <p className='font-semibold text-gray-700'>{carouselData[currentIndex].info}</p>
                <p className='font-bold'>{carouselData[currentIndex].company}</p>
                <p className='font-semibold text-gray-700'>{carouselData[currentIndex].position}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          className='absolute right-0 bg-white rounded-full p-2 text-black hover:bg-gray-200'
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          onClick={handleNext}
        >
          <FaChevronRight className='text-[2vw]' />
        </button>
      </div>
    </div>
  );
};

export default Comments;
