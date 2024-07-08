import React from "react";
import {
  FaPython,
  FaVuejs,
  FaDocker,
  FaNodeJs,
  FaBootstrap,
  FaDatabase,
  FaFlask,
  FaJs,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const Projects = () => {
  const { darkMode } = useTheme();
  const techChipClass = `flex items-center justify-center p-2 m-2 rounded-full ${
    darkMode ? "bg-white text-slate-800" : "bg-slate-800 text-white"
  }`;

  return (
    <div className="text-center my-8 px-4">
      <h2 className="text-3xl font-bold mb-8">My Projects</h2>
      <div className="flex flex-col items-center space-y-8">
        <div
          className={`${
            darkMode ? "bg-slate-700" : "bg-slate-100"
          } shadow-lg rounded-lg p-6 w-full lg:w-1/2`}
          data-aos="flip-up"
          data-aos-delay="300"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Matching Project Allocation System
          </h3>
          <p className="mb-4">
            This was my final year project, where I developed a application to automate a manual process at my
            university. The web application allowed students to add their idea for the final year project and
            automatically be assigned a tutor, and the tutor could suggest
            projects for students.
          </p>
          <div className="flex flex-wrap justify-center">
          <div className={techChipClass}>
              <FaPython className="text-xl" />
              <span className="ml-2">Python</span>
            </div>
            <div className={techChipClass}>
              <FaVuejs className="text-xl" />
              <span className="ml-2">Vue.js</span>
            </div>
            <div className={techChipClass}>
              <FaJs className="text-xl" />
              <span className="ml-2">JavaScript</span>
            </div>
            <div className={techChipClass}>
              <FaDocker className="text-xl" />
              <span className="ml-2">Docker</span>
            </div>
            <div className={techChipClass}>
              <FaFlask className="text-xl" />
              <span className="ml-2">Flask</span>
            </div>
            <div className={techChipClass}>
              <FaDatabase className="text-xl" />
              <span className="ml-2">PostgreSQL</span>
            </div>
          </div>
        </div>
        <div
          className={`${
            darkMode ? "bg-slate-700" : "bg-slate-100"
          } shadow-lg rounded-lg p-6 w-full lg:w-1/2`}
          data-aos="flip-up"
          data-aos-delay="300"
        >
          <h3 className="text-2xl font-semibold mb-4">3DPrinting</h3>
          <p className="mb-4">
            Managing 3D printing orders as part of a university project that
            gives you access to each order and the file that needs to be printed.
          </p>
          <div className="flex flex-wrap justify-center">
          <div className={techChipClass}>
              <FaNodeJs className="text-xl" />
              <span className="ml-2">Node.js</span>
            </div>
            <div className={techChipClass}>
              <FaBootstrap className="text-xl" />
              <span className="ml-2">Bootstrap</span>
            </div>
            <div className={techChipClass}>
              <FaJs className="text-xl" />
              <span className="ml-2">JavaScript</span>
            </div>
            <div className={techChipClass}>
              <FaDatabase className="text-xl" />
              <span className="ml-2">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
