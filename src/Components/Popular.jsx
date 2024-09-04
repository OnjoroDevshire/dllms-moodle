import React from 'react';
import { bigDataImage , pythonForDataScience,dataStructureimg} from '../assets';
const courses = [
    {
      id: 1,
      title: "Introduction to JavaScript",
      slug: "introduction-to-javascript",
      image: bigDataImage,
      likes: 120,
      instructor: {
        name: "John Doe",
        image: bigDataImage,
      },
      publishDate: "2023-06-01",
      timeAgo: "2 weeks ago",
    },
    {
      id: 2,
      title: "React for Beginners",
      slug: "react-for-beginners",
      image: dataStructureimg,
      likes: 200,
      instructor: {
        name: "Jane Smith",
        image: dataStructureimg ,
      },
      publishDate: "2023-05-20",
      timeAgo: "1 month ago",
    },
    {
      id: 3,
      title: "Advanced CSS Techniques",
      slug: "advanced-css-techniques",
      image: pythonForDataScience,
      likes: 95,
      instructor: {
        name: "Emily Johnson",
        image: pythonForDataScience,
      },
      publishDate: "2023-07-10",
      timeAgo: "1 week ago",
    },
    // Add more courses as needed
  ];

const Popular = () => {
  return (
    <div className="relative pt-2 lg:pt-2 min-h-screen">
              <p className='text-[3vw] mt-[2vw] ml-[8vw]'>Popular This Month</p>
      <div
        className="bg-cover w-full flex justify-center items-center"
        style={{ backgroundImage: "url('/images/mybackground.jpeg')" }}
      >
        <div className="w-full bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
          <div className="w-12/12 mx-auto rounded-2xl bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center px-2 mx-auto">
              {courses.map((course) => (
                <article
                  key={course.id}
                  className="bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border"
                >
                  <a
                    target="_self"
                    href={`/courses/${course.slug}`}
                    className="absolute opacity-0 top-0 right-0 left-0 bottom-0"
                  ></a>
                  <div className="relative mb-4 rounded-2xl">
                    <img
                      className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                      src={course.image}
                      alt={course.title}
                    />
                    <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 text-red-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      <span className="ml-1 text-sm text-slate-400">{course.likes}</span>
                    </div>

                    <a
                      className="flex justify-center items-center bg-red-700 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
                      href={`/courses/${course.slug}`}
                      target="_self"
                      rel="noopener noreferrer"
                    >
                      View Course
                      <svg
                        className="ml-2 w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <div className="flex justify-between items-center w-full pb-4 mb-auto">
                    <div className="flex items-center">
                      <div className="pr-3">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={course.instructor.image}
                          alt={course.instructor.name}
                        />
                      </div>
                      <div className="flex flex-1">
                        <div>
                          <p className="text-sm font-semibold">{course.instructor.name}</p>
                          <p className="text-sm text-gray-500">Published on {course.publishDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="text-sm flex items-center text-gray-500">
                        {course.timeAgo}
                        <svg
                          className="ml-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-xl leading-8">
                    <a
                      href={`/courses/${course.slug}`}
                      className="block relative group-hover:text-red-700 transition-colors duration-200"
                    >
                      {course.title}
                    </a>
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 

export default Popular