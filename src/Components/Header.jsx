import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaUser } from 'react-icons/fa'; // Import FaUser for profile icon
import SearchComponent from './SearchComponent';
import AuthContext from '../Context/AuthContext'; 
// Import your AuthContext

const Header = ({ isLoggedIn }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { logout } = useContext(AuthContext); // Destructure logout from AuthContext

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className="bg-blue-600 font-sans leading-normal tracking-normal">
            <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-4 w-full z-10 top-0">
                <div className="flex items-center flex-no-shrink text-white mr-6">
                    <a className="text-white no-underline hover:text-white hover:no-underline" href="#">
                        <div className="flex font-bold gap-[0.8vw]">
                            <div className="text-white bg-nav-blue w-[3.3vw] h-[3.3vw] rounded-[0.7vw] text-[1.4vw] flex justify-center leading-[3.2vw]">
                                <p>DL</p>
                            </div>
                            <p className="text-nav-blue mt-[0.8vw] text-[1.1vw] lg:block hidden">DIGITAL LEARNING</p>
                        </div>
                    </a>
                </div>

                <div className="block lg:hidden">
                    <button
                        onClick={toggleNav}
                        className="flex items-center px-3 py-2 border rounded text-gray-400 border-gray-600 hover:text-white hover:border-white"
                    >
                        <svg
                            className="fill-current h-3 w-3"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>

                <div
                    className={`w-full flex-grow lg:flex lg:items-center lg:w-auto  pt-6 lg:pt-0 ${isNavOpen ? '' : 'hidden'}`}
                    id="nav-content"
                >
                    <SearchComponent />

                    <ul className="list-reset lg:flex justify-end flex-1 items-center">
                        {isLoggedIn ? (
                            <>
                            <li className="mr-3">
                                    <a className="inline-block py-2 px-4 text-white no-underline" href="/dllms-moodle/courses">
                                        Courses
                                    </a>
                                </li>
                                <li className="mr-3">
                                    <Link to="/notifications" className="inline-block py-2 px-4 text-gray-400 no-underline hover:text-white">
                                        <FaBell className="text-white w-6 h-6" />
                                    </Link>
                                </li>
                                
                                <li className="mr-3">
                                    <Link to="/profile" className="inline-block py-2 px-4 text-gray-400 no-underline hover:text-gray-300 hover:text-underline">
                                        <FaUser className="text-white w-6 h-6 border rounded-full" />
                                    </Link>
                                </li>
                                <li className="mr-3">
                                    <button
                                        className="inline-block text-gray-100 no-underline hover:text-gray-300 hover:text-underline py-2 px-4"
                                        onClick={logout} // Call logout on click
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="mr-3">
                                    <a className="inline-block py-2 px-4 text-white no-underline" href="#">
                                        Courses
                                    </a>
                                </li>
                                <li className="mr-3">
                                    <Link to="/login" className="inline-block text-gray-50 no-underline hover:text-gray-300 hover:text-underline py-2 px-4">
                                        Login
                                    </Link>
                                </li>
                                <li className="mr-3 border rounded-md">
  <Link to="/signup" className="inline-block text-gray-50 no-underline hover:text-gray-300 hover:text-underline py-2 px-4">
    Signup
  </Link>
</li>
                               
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
