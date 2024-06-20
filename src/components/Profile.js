import React from "react";
import About from "./About";
import ContactInfo from "./ContactInfo";
import Interests from "./Interests";
import Skills from "./Skills";
import Projects from "./Projects";
import EducationExperience from "./EducationExperience";
import { useTheme } from "../contexts/ThemeContext";

const Profile = () => {
  const { darkMode } = useTheme();
  return (
    <div className={`${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
    style={{
      backgroundImage: `url(${darkMode ? "/dark-pattern.svg" : "/light-pattern.svg"})`,
    }}
    >
      <div className={`container mx-auto ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-black'}`}>
        <div id="about">
          <About/>
        </div>
        
        
        <div id="skills">
          <Skills/>
        </div>
        <div id="projects">
          <Projects
            projects={[{ name: "Project 1", description: "Description 1" }]}
          />
        </div>
        <div id="experience">
          <EducationExperience
            education={[{ degree: "Degree", institution: "Institution" }]}
            experience={[{ jobTitle: "Job Title", company: "Company" }]}
          />
          <div id="interests">
          <Interests items={["Coding", "Music", "Gaming"]} />
        </div>
        <div id="contact-info">
          <ContactInfo email="your-email@example.com" phone="123-456-7890" />
        </div>
        </div>
      </div>
      </div>
  );
};

export default Profile;
