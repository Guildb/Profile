import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer className={`py-8 px-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'}`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Renato Cardoso</h2>
          <p className="text-sm">Software Engineer</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://github.com/Guildb" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl hover:text-blue-500 transition-colors duration-200" />
          </a>
          <a href="https://www.linkedin.com/in/renato-cardoso-1b94ba152/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-blue-500 transition-colors duration-200" />
          </a>
          <a href="mailto:renatoscardoso@outlook.com">
            <FaEnvelope className="text-2xl hover:text-blue-500 transition-colors duration-200" />
          </a>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Renato Cardoso. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

