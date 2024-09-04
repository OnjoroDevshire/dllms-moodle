import React, { useState } from 'react';
import { learner1, learner2, learner3 } from '../assets';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Sample JSON response
const testimonialData = [
  {
    avatar: learner1,
    quote: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quam sapiente molestiae numquam quas, voluptates omnis nulla ea odio quia similique corrupti magnam.',
    name: 'Daniel Smith',
    title: 'First Year Student',
  },
  {
    avatar: learner2,
    quote: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quam sapiente molestiae numquam quas, voluptates omnis nulla ea odio quia similique corrupti magnam.',
    name: 'Jayson Keith',
    title: 'Web Designer',
  },
  {
    avatar: learner3,
    quote: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quam sapiente molestiae numquam quas, voluptates omnis nulla ea odio quia similique corrupti magnam.',
    name: 'William Keith',
    title: 'Video Producer',
  }
];

const LearnersTake = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialData.length) % testimonialData.length);
  };

  return (
    <div className='bg-gray-50 md:px-6'>
      <div className='relative bg-gray-50'>
        <p className='font-serif text-lg md:text-2xl mt-6 font-bold text-black text-center'>
          What other learners had to say
        </p>

        <div className="relative w-full max-w-md mx-auto mt-5 p-5 md:p-0">
        <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 rounded-full p-2 shadow-md hover:bg-gray-200 z-10"
            >
              <FaChevronLeft className="text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 rounded-full p-2 shadow-md hover:bg-gray-200 z-10"
            >
              <FaChevronRight className="text-gray-800" />
            </button>
          
          <div className="relative overflow-hidden">
           
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialData.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full p-6 bg-white rounded-lg shadow-md md:p-4"
                >
                  <img
                    src={testimonial.avatar}
                    className="w-24 h-24 rounded-full shadow-md mx-auto"
                    alt={`${testimonial.name} avatar`}
                  />
                  <p className="my-4 font-light text-neutral-500 text-center text-sm md:text-base">
                    {testimonial.quote}
                  </p>
                  <p className="mb-2 text-xl font-semibold text-neutral-800 text-center">
                    {testimonial.name}
                  </p>
                  <p className="mb-0 font-semibold text-neutral-500 text-center">
                    {testimonial.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnersTake;
