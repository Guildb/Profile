import React from 'react';
import { Link } from 'react-scroll';
import { useTheme } from '../contexts/ThemeContext';


const Header = () => {
  const { darkMode } = useTheme();
  return (
    <header className={`mt-4 absolute top-0 left-1/2 transform -translate-x-1/2 py-4 bg-opacity-75  rounded-full p-6 ${darkMode ? 'text-white' : 'text-slate'}`}>
      <nav>
        <ul className="flex justify-center space-x-4">
          <li>
            <Link
              to="about"
              smooth={true}
              duration={1000}
              className="cursor-pointer"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="skills"
              smooth={true}
              duration={1000}
              className="cursor-pointer"
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              to="projects"
              smooth={true}
              duration={1000}
              className="cursor-pointer"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="experience"
              smooth={true}
              duration={1000}
              className="cursor-pointer"
            >
              Experience
            </Link>
          </li>
          <li>
            <Link
              to="interests"
              smooth={true}
              duration={1000}
              className="cursor-pointer"
            >
              Interests
            </Link>
          </li>
          <li>
            <Link
              to="contact-info"
              smooth={true}
              duration={1000}
              className="cursor-pointer"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
