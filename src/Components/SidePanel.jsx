import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFolder, faCertificate, faBook } from '@fortawesome/free-solid-svg-icons';

const SidePanel = () => {
    const sidePanelData = [
        {
            icon: faHome,
            title: "Home",
            subTitle: []
        },
        {
            icon: faFolder,
            title: "Browse",
            subTitle: ["Business", "Technology", "Creative"]
        },
        {
            icon: faBook,
            title: "My Courses",
            subTitle: []
        },
        {
            icon: faCertificate,
            title: "Certifications",
            subTitle: []
        }
    ];

    return (
        <div>
            <div className='w-[17vw] h-[43.8vw] bg-nav-blue pt-[4.5vw]'>
                <Link to='/dl-lms/TempPage'>
                    {sidePanelData.map((option, index) => (
                        <div key={index} className='cursor-pointer'>
                            <div className='pl-[2vw] flex gap-[0.8vw] py-[0.5vw] text-white hover:bg-white font-bold text-[1.25vw] hover:text-nav-blue transition-colors duration-200 ease-in-out'>
                                <FontAwesomeIcon icon={option.icon} className='h-[1.4vw] mt-[0.3vw]' />
                                <p>
                                    {option.title}
                                </p>
                            </div>

                            {option.subTitle.map((info, i) => (
                                <div key={i} className='pl-[4.2vw] py-[0.5vw] font-light tracking-[0.15vw] text-[1.25vw] text-white hover:bg-white hover:text-nav-blue'>
                                    <p>
                                        {info}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </Link>

               
            </div>
        </div>
    );
};

export default SidePanel;
