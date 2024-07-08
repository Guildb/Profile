import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaGraduationCap, FaLaptopCode, FaServer } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const EducationExperience = () => {
  const { darkMode } = useTheme();

  const experiences = [
    {
      title: "Undergraduate Degree",
      location: "Southampton, UK",
      description:
        "Graduated with honours first-class degree in (BCS) Software Engineering",
      date: "2021-2024",
      icon: FaGraduationCap,
    },
    {
      title: "Front-End/Vue.js",
      location: "Southampton, UK",
      description:
        "In collaboration with DataMango, we executed and delivered a carbon footprint measuring project. I was responsible for the development of the front end and integration of with the back-end using Vue.js, Tailwind for styling and vue-chartjs for data visualization.",
      date: "2024",
      icon: FaLaptopCode,
    },
    {
      title: "DevOps/React",
      location: "Southampton, UK",
      description:
        "Worked within a small team in charge of designing and delivering a full-stack web and mobile application for managing points of interests. My role was to develop and integrate the React front-end and create the visualization of a map with POI's using OpenStreetMap.",
      date: "2023",
      icon: FaServer,
    },
  ];

  return (
    <div
      className=" my-8 px-4"
    >
      <h2 className="text-3xl font-bold mb-8">Experience</h2>
      <VerticalTimeline>
        {experiences.map((experience, index) => (
          <VerticalTimelineElement
            key={index}
            contentStyle={{
              background: darkMode ? "#334155" : "#fff",
              color: darkMode ? "#fff" : "#374151",
            }}
            contentArrowStyle={{
              borderRight: `7px solid ${darkMode ? "#fff" : "#374151"}`,
            }}
            date={experience.date}
            iconStyle={{
              background: darkMode ? "#334155" : "#374151",
              color: "#fff",
            }}
            icon={<experience.icon />}
          >
            <h3 className="vertical-timeline-element-title text-xl font-bold">
              {experience.title}
            </h3>
            <h4 className="vertical-timeline-element-subtitle text-md font-semibold text-gray-400">
              {experience.location}
            </h4>
            <p>{experience.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default EducationExperience;
