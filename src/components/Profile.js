import React from "react";
import About from "./About";
import ContactInfo from "./ContactInfo";
import Interests from "./Interests";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import { useTheme } from "../contexts/ThemeContext";

const Profile = () => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/${
          darkMode ? "dark-pattern.svg" : "light-pattern.svg"
        })`,
      }}
    >
      <div
        className={`container mx-auto shadow-lg ${
          darkMode ? "bg-slate-800 text-white" : "bg-slate-100 text-black"
        }`}
      >
        <div id="about" className="scroll-mt-20">
          <About />
        </div>
        <div id="skills" className="scroll-mt-20">
          <Skills />
        </div>
        <div id="projects" className="scroll-mt-20">
          <Projects />
        </div>
        <div id="experience" className="scroll-mt-20">
          <Experience />
        </div>
        <div id="interests" className="scroll-mt-20">
          <Interests />
        </div>
        <div id="contact-info" className="scroll-mt-20">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default Profile;
