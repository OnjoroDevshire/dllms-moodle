import React from 'react';
import { ilab, Safaricom, Strathmore } from '../assets';

const partners = [
  { src: ilab, alt: 'Ilab' },
  { src: Strathmore, alt: 'Strathmore' },
  { src: Safaricom, alt: 'Safaricom' },
  // Add more partners here as needed
];

const Partners = () => {
  return (
    <div className="flex my-6 flex-col p-10  bg-gray-50 px-4 w-full  ">
      <p className="text-sm md:text-base lg:text-lg bold text-center">
        Our Certificates are recognized by top institutions
      </p>
      <div className="flex flex-wrap justify-between items-center mr-12 ml-12">
        {partners.slice(0, 3).map((partner, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 flex justify-center items-center"
          >
            <img
              src={partner.src}
              alt={partner.alt}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
