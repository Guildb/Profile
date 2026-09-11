import React from "react";
import About from "./About";
import ContactInfo from "./ContactInfo";
import Interests from "./Interests";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";

const Profile = () => {
  return (
    <div
      className="bg-theme-image bg-canvas"
      style={{
        "--bg-image-light": `url(${process.env.PUBLIC_URL}/light-pattern.svg)`,
        "--bg-image-dark": `url(${process.env.PUBLIC_URL}/dark-pattern.svg)`,
      }}
    >
      <div className="container mx-auto bg-canvas text-ink shadow-lg">
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
