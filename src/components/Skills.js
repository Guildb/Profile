import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  FaLaptopCode,
  FaPalette,
  FaLightbulb,
  FaServer,
  FaDatabase,
  FaPython,
  FaJava,
  FaJsSquare,
  FaReact,
  FaVuejs,
  FaNodeJs,
} from "react-icons/fa";

const Skills = () => {
  const { darkMode } = useTheme();

  return (
    <div className="text-center my-8 px-4">
      <h2 className="text-3xl font-bold mb-8">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div
          className={`shadow-lg rounded-lg p-6 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h3 className="text-2xl font-semibold mb-4">General Skills</h3>
          <ul className="list-none space-y-2">
            <li className="flex items-center">
              <FaPalette className="mr-2 text-blue-500" />
              Web Design
            </li>
            <li className="flex items-center">
              <FaLightbulb className="mr-2 text-blue-500" />
              Design Thinking
            </li>
            <li className="flex items-center">
              <FaLaptopCode className="mr-2 text-blue-500" />
              Full Stack Development
            </li>
            <li className="flex items-center">
              <FaLightbulb className="mr-2 text-blue-500" />
              Problem Solving
            </li>
            <li className="flex items-center">
              <FaLaptopCode className="mr-2 text-blue-500" />
              Computer Literacy
            </li>
            <li className="flex items-center">
              <FaLaptopCode className="mr-2 text-blue-500" />
              Software Development
            </li>
            <li className="flex items-center">
              <FaServer className="mr-2 text-blue-500" />
              Database Design and Management
            </li>
          </ul>
        </div>
        <div
          className={`shadow-lg rounded-lg p-6 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {" "}
          <h3 className="text-2xl font-semibold mb-4">
            Technologies and Frameworks
          </h3>
          <ul className="list-none space-y-2">
            <li className="flex items-center">
              <FaReact className="mr-2 text-blue-500" />
              React
            </li>
            <li className="flex items-center">
              <FaVuejs className="mr-2 text-blue-500" />
              Vue.js
            </li>
            <li className="flex items-center">
              <FaLaptopCode className="mr-2 text-blue-500" />
              Tailwind
            </li>
            <li className="flex items-center">
              <FaLaptopCode className="mr-2 text-blue-500" />
              Flask
            </li>
            <li className="flex items-center">
              <FaNodeJs className="mr-2 text-blue-500" />
              Node.js
            </li>
            <li className="flex items-center">
              <FaLaptopCode className="mr-2 text-blue-500" />
              Express
            </li>
          </ul>
        </div>
        <div
          className={`shadow-lg rounded-lg p-6 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {" "}
          <h3 className="text-2xl font-semibold mb-4">Programming Languages</h3>
          <ul className="list-none space-y-2">
            <li className="flex items-center">
              <FaPython className="mr-2 text-blue-500" />
              Python
            </li>
            <li className="flex items-center">
              <FaJava className="mr-2 text-blue-500" />
              Java
            </li>
            <li className="flex items-center">
              <FaJsSquare className="mr-2 text-blue-500" />
              JavaScript
            </li>
          </ul>
        </div>
        <div
          className={`shadow-lg rounded-lg p-6 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {" "}
          <h3 className="text-2xl font-semibold mb-4">Databases</h3>
          <ul className="list-none space-y-2">
            <li className="flex items-center">
              <FaDatabase className="mr-2 text-blue-500" />
              PostgreSQL
            </li>
            <li className="flex items-center">
              <FaDatabase className="mr-2 text-blue-500" />
              MySQL
            </li>
            <li className="flex items-center">
              <FaDatabase className="mr-2 text-blue-500" />
              SQLite
            </li>
            <li className="flex items-center">
              <FaDatabase className="mr-2 text-blue-500" />
              MongoDB
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
