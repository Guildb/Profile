import React from "react";
import Header from "./Header";
import { FaLinkedin, FaGithub  } from "react-icons/fa";
import { TbFileCv } from "react-icons/tb";
import { useTheme } from "../contexts/ThemeContext";

const LandingPage = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`relative h-screen bg-cover bg-center ${
        darkMode ? "bg-dark-landing" : "bg-light-landing"
      }`}
      style={{
        backgroundImage: `url(${
          darkMode ? "/dark-background.jpg" : "/light-background.jpg"
        })`,
      }}
    >
      <Header />
      <div
        className={`flex flex-col items-center justify-center h-full ${
          darkMode
            ? "bg-black bg-opacity-40 text-white"
            : "bg-white bg-opacity-40 text-slate"
        }`}
      >
        <div className="items-center" style={{ width: "50vw" }}>
          <h1 className="text-4xl mt-4">Welcome</h1>
          <h1 className="text-4xl mt-4">I'm Renato Cardoso</h1>
          <p className="text-lg mt-2 text-center">
            Take a look around my page to see what I’ve been working on and
            learn a bit more about me. If you want to connect or chat about
            potential collaborations, don’t hesitate to reach out. I’d love to
            hear from you!
          </p>
          <ul className="flex flex-col items-center mt-4 space-y-4">
            <li className="flex items-center">
              <a
                href="https://www.linkedin.com/in/renato-cardoso-1b94ba152/"
                className="w-12 h-12 flex items-center justify-center rounded-full transform hover:scale-150 transition-transform duration-300"
              >
                <FaLinkedin className="w-6 h-6 m-2" />
              </a>

              <a
                href="https://github.com/Guildb"
                className="w-12 h-12 flex items-center justify-center rounded-full transform hover:scale-150 transition-transform duration-300"
              >
                <FaGithub className="w-6 h-6 m-2" />
              </a>

              <a
                href="CV.pdf"
                download
                className="w-12 h-12 flex items-center justify-center rounded-full transform hover:scale-150 transition-transform duration-300"
              >
                <TbFileCv className="w-6 h-6 m-2" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
