import React from 'react';
import { heroimg1 } from '../assets';

const Hero = () => {
    return (
<div className="relative overflow-hidden">
    {/* Background Image Container */}
    <div
        style={{
            background: `url(${heroimg1}) no-repeat center`,
            backgroundSize: 'cover',
        }}
        className="w-full h-64 md:h-80 lg:h-96"
    ></div>

    {/* Content Container */}
    <div className="relative py-6 px-4 text-center text-white font-bold text-2xl md:text-3xl lg:py-0 lg:px-0 lg:text-left lg:flex lg:justify-center lg:items-center">
        <div className="lg:w-1/2"></div> {/* Spacer for the image on large screens */}
        
    </div>
    <div className="bg-black text-white p-6 shadow-md w-full lg:w-1/3 lg:absolute lg:left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:mr-8 lg:z-10">
            <h1 className="text-lg md:text-2xl lg:text-xl pb-4">Learn more, spend less!</h1>
            <p className="text-sm md:text-base lg:text-lg">
                With tailormade courses from as low as KES 1,500
            </p>
        </div>
</div>

    
    
    );
};

export default Hero;
