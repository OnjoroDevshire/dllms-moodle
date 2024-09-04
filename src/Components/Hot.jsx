import React from 'react';

// Sample JSON data
const categories = [
  {
    name: "Computer Science Engineering",
    topics: 63,
    mcqs: 20697
  },
  {
    name: "Mechanical Engineering",
    topics: 48,
    mcqs: 18222
  },
  {
    name: "Civil Engineering",
    topics: 55,
    mcqs: 14783
  },
  {
    name: "Information Technology Engineering",
    topics: 26,
    mcqs: 8818
  },
  {
    name: "Electrical Engineering",
    topics: 40,
    mcqs: 9584
  },
  {
    name: "Electronics and Communication Engineering",
    topics: 8,
    mcqs: 2576
  },
  {
    name: "Electronics and Telecommunication Engineering",
    topics: 5,
    mcqs: 1739
  },
  {
    name: "Biomedical Engineering",
    topics: 1,
    mcqs: 217
  },
  {
    name: "Manufacturing Engineering",
    topics: 1,
    mcqs: 154
  }
];

const Hot = () => {
  return (
<div className='mr-6 ml-6'>
  <div className='w-full h-[2vw]'>
    <p className='text-[1.5vw] mt-[2vw] font-bold text-black'>
      Hot Topics 
    </p>
  </div>

  <div className='flex mt-[2vw] justify-center mb-[3vw]'>
    <div className='w-[100vw] flex flex-wrap gap-[2vw] justify-around'>
      {categories.map((category, index) => (
        <a
          key={index}
          href="#"
          className="bg-gray-100 flex-grow text-black border-l-8 border-black rounded-md px-3 py-2"
          style={{ flexBasis: 'calc(33% - 2vw)' }} // Adjust width of each category
        >
          {category.name}
          <div className="text-gray-500 font-semibold leading-[1.7vw]">
            <span className="block">Topics: {category.topics}</span>
            <span className="block">MCQs: {category.mcqs}</span>
          </div>
        </a>
      ))}
    </div>
  </div>
</div>

  );
};

export default Hot;
