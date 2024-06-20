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
        backgroundImage: `url(${
          darkMode ? "/dark-pattern.svg" : "/light-pattern.svg"
        })`,
      }}
    >
      <div
        className={`container mx-auto ${
          darkMode ? "bg-slate-800 text-white" : "bg-slate-100 text-black"
        }`}
      >
        <div id="about" >
          <About />
        </div>
        <div id="skills" >
          <Skills />
        </div>
        <div id="projects" >
          <Projects />
        </div>
        <div id="experience" >
          <Experience />
          <div id="interests" >
            <Interests />
          </div>
          <div id="contact-info" >
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
