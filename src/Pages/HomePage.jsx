import React from 'react';
import { Header, LearnersTake, Hero, Hot,Courses, Categories,Partners, Popular, Footer, Comments } from '../Components';
import { Link } from 'react-router-dom';
import { coprateImage1,coprateImage } from '../assets';

const HomePage = () => {
    return (
        <div className="m-0 p-0"> {/* Ensure no margin or padding on the container */}
            <Header /> {/* Ensure Header has no margin or padding */}
            <Hero />
            <Partners />
            <Courses />
            <Categories/>
            <Hot/>
            <LearnersTake />
           
            <div className='flex gap-[1.0vw]'>
          <div className='w-[40.5vw] h-[15vw] ml-[6vw] mt-[10vw] bg-opacity-20 bg-strathmore-grey pl-[5vw] pr-[3vw] pt-[4.5vw] rounded-[0.3vw] drop-shadow mr-6 mb-2'>
            <p className='text-red-900 text-[1.8vw] mb-[2.2vw]'>
              Drive business impact <br /> Get access to courses for your business, higher education, or government team
            </p>

            {/* <div className='w-[11vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white border-[0.15vw] border-white text-[1vw] drop-shadow'>
              <p>
                Get DL for Business
              </p>
            </div> */}

            <Link to='/login'>
              <div className='w-[11vw] h-[2.8vw] bg-blue-600 text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white border-[0.15vw] border-white text-[1vw] drop-shadow hover:scale-105 transition-transform'>
                <p>
                  Get DL for Business
                </p>
              </div>
            </Link>
          </div>

          <img src={coprateImage} className='h-[25.5vw] mt-[2vw] pb-[1.5vw] rounded-[50vw]' />
        </div>

        <Comments />

        
        <Footer />
    </div>
  
    );
};

export default HomePage;
