import React from 'react';

// Sample JSON data
const categories = [
  {
    name: "Information Technology",
    topics: "Data Science",
    seen: 360,
  },
  {
    name: "Mechanical Engineering",
    topics: "Automotive Maintenance",
    seen: 18222
  },
  {
    name: "Electrical Engineering",
    topics: "Semi conductors and conductors",
    seen: 14783
  },
  {
    name: "Accounting",
    topics: "Balancing Accounts",
    seen: 8818
  },
  {
    name: "Survey ",
    topics: "Principles of Surveying",
    seen: 9584
  },
  {
    name: "Electronics and Communication Engineering",
    topics: 8,
    seen: 2576
  },
  {
    name: "Electronics and Telecommunication Engineering",
    topics: 5,
    seen: 1739
  },
  {
    name: "Biomedical Engineering",
    topics: 1,
   seen: 217
  },
  {
    name: "Manufacturing Engineering",
    topics: 1,
   seen: 154
  }
];

const Hot = () => {
  return (
<div className='mr-6 ml-6'>
  <div className='w-full h-[2vw]'>
    <p className='text-[1.5vw] mt-[2vw] font-bold text-gray-800'>
      Hot Topics per Category 
    </p>
  </div>

  <div className='flex mt-[2vw] justify-center mb-[3vw]'>
    <div className='w-[100vw] flex flex-wrap gap-[2vw] justify-around'>
      {categories.map((category, index) => (
        <a
          key={index}
          href="#"
          className="bg-blue-50 flex-grow font-serif text-grey-800 border-l-8 border-red-900 rounded-md px-3 py-2"
          style={{ flexBasis: 'calc(33% - 2vw)' }} // Adjust width of each category
        >
          {category.name}
          <div className="text-gray-500  leading-[1.7vw]">
            <span className="block font-serif">Topics: {category.topics}</span>
            <span className="block font-serif">Seen by: {category.seen}</span>
          </div>
        </a>
      ))}
    </div>
  </div>
</div>

  );
};

export default Hot;
