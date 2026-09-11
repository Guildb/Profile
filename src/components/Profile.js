import React from "react";
import About from "./About";
import ContactInfo from "./ContactInfo";
import Interests from "./Interests";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import AuroraBackground from "./ui/AuroraBackground";
import Grain from "./ui/Grain";

const sections = [
  { id: "about", Component: About, deferred: false },
  { id: "skills", Component: Skills, deferred: true },
  { id: "projects", Component: Projects, deferred: true },
  { id: "experience", Component: Experience, deferred: true },
  { id: "interests", Component: Interests, deferred: true },
  { id: "contact-info", Component: ContactInfo, deferred: true },
];

const Profile = () => (
  <div className="relative bg-canvas">
    <AuroraBackground className="fixed" />
    <Grain />
    <div className="relative z-[2] container mx-auto px-4">
      {sections.map(({ id, Component, deferred }) => (
        <section
          key={id}
          id={id}
          aria-labelledby={`${id}-heading`}
          className={`scroll-mt-20 ${deferred ? "deferred-section" : ""}`}
        >
          <Component />
        </section>
      ))}
    </div>
  </div>
);

export default Profile;
