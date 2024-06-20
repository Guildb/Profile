import React from 'react';
import { Link } from 'react-scroll';
import { useTheme } from '../contexts/ThemeContext';


const Header = () => {
  const { darkMode } = useTheme();
  return (
    <header className={`mt-4 absolute fixed top-0 left-0 w-full py-4 bg-opacity-75 ${darkMode ? 'text-white' : 'text-slate'} `}>
      <nav className="container mx-auto flex flex-wrap justify-center items-center p-4">
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 shadow-md rounded-full">
            <Link
              to="about"
              smooth={true}
              duration={1000}
              className={`cursor-pointer py-2 px-3 ${darkMode ? 'hover:text-yellow-500' : 'hover:text-orange-500'}`}
              >
              About
            </Link>
            <Link
              to="skills"
              smooth={true}
              duration={1000}
              className={`cursor-pointer py-2 px-3 ${darkMode ? 'hover:text-yellow-500' : 'hover:text-orange-500'}`}
            >
              Skills
            </Link>
            <Link
              to="projects"
              smooth={true}
              duration={1000}
              className={`cursor-pointer py-2 px-3 ${darkMode ? 'hover:text-yellow-500' : 'hover:text-orange-500'}`}
            >
              Projects
            </Link>
            <Link
              to="experience"
              smooth={true}
              duration={1000}
              className={`cursor-pointer py-2 px-3 ${darkMode ? 'hover:text-yellow-500' : 'hover:text-orange-500'}`}
            >
              Experience
            </Link>
            <Link
              to="interests"
              smooth={true}
              duration={1000}
              className={`cursor-pointer py-2 px-3 ${darkMode ? 'hover:text-yellow-500' : 'hover:text-orange-500'}`}
            >
              Interests
            </Link>
            <Link
              to="contact-info"
              smooth={true}
              duration={1000}
              className={`cursor-pointer py-2 px-3 ${darkMode ? 'hover:text-yellow-500' : 'hover:text-orange-500'}`}
            >
              Contact
            </Link>
            </div>
      </nav>
    </header>
  );
};

export default Header;
