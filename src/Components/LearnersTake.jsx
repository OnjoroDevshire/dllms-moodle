import React from 'react';
import Slider from 'react-slick';
import { learner1, learner2, learner3 } from '../assets';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Sample JSON response
const testimonialData = [
  {
    avatar: learner1,
    quote: 'This app has transformed the way I study. The courses are well-structured, and the quizzes help me retain information better. Highly recommend it for any student!',
    name: 'Kwame Asante',
    title: 'First Year Student',
  },
  {
    avatar: learner2,
    quote: 'As a designer, I’ve found the resources in this app invaluable. The interactive content and easy-to-navigate interface make learning so much more engaging.',
    name: 'Amina Hassan',
    title: 'Web Designer',
  },
  {
    avatar: learner3,
    quote: 'The app helped me stay on track with my video production courses. The quizzes and real-time feedback have been a game-changer for me.',
    name: 'Kofi Mensah',
    title: 'Video Producer',
  },
  {
    avatar: learner1,
    quote: 'I love how this app offers personalized learning paths. It has helped me excel in subjects I used to struggle with. Definitely a must-have for students!',
    name: 'Zainab Abubakar',
    title: 'Second Year Student',
  },
  {
    avatar: learner2,
    quote: 'The app’s interface is so user-friendly, and the content is rich. It’s a perfect companion for anyone looking to sharpen their skills in any field.',
    name: 'Chinedu Okafor',
    title: 'Software Engineer',
  },
  {
    avatar: learner3,
    quote: 'I’ve used several academic apps before, but this one stands out. The ability to track my progress through the chapters and quizzes has made learning so much easier.',
    name: 'Thandiwe Ndlovu',
    title: 'Marketing Specialist',
  }
];

// Custom arrow component
const NextArrow = ({ onClick }) => {
  return (
    <button
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black rounded-full p-2 shadow-md hover:bg-gray-800 z-10"
      onClick={onClick}
    >
      <FaChevronRight className="text-white" />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black rounded-full p-2 shadow-md hover:bg-gray-800 text-white z-10"
      onClick={onClick}
    >
      <FaChevronLeft className="text-white" />
    </button>
  );
};

const LearnersTake = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-blue-50 md:px-6 py-5">
      <div className="relative w-full max-w-6xl mx-auto mt-5 p-5 md:p-0 mb-3">
        <p className="text-[1.5vw] mt-[0.2vw] font-bold font-serif mb-2 text-gray-800 text-center">
          What other learners had to say
        </p>

        <div className="relative">
          <Slider {...sliderSettings}>
            {testimonialData.map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md md:p-4 flex flex-col justify-between h-[350px]">
                <img
                  src={testimonial.avatar}
                  className="w-24 h-24 rounded-full shadow-md mx-auto"
                  alt={`${testimonial.name} avatar`}
                />
                <p className="my-4 font-light text-neutral-600 text-center text-sm md:text-base">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="mb-2 text-xl font-semibold text-neutral-800 text-center">
                    {testimonial.name}
                  </p>
                  <p className="mb-0 font-semibold text-neutral-500 text-center">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default LearnersTake;
