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
        "In association with DataMango, collaboratively executed and delivered a carbon footprint measuring project until completion, within 3 months. I was responsible to develop and integrate with the backend the whole front-end using Vue.js with the help of Tailwind for styling and vue-chartjs for data visualization.",
      date: "2024",
      icon: FaLaptopCode,
    },
    {
      title: "DevOps/React",
      location: "Southampton, UK",
      description:
        "Worked as a developer within a small team to design and deliver an interactive, full-stack web application for managing points of interests, and a mobile application. My role was to create and integrate the whole React front-end and the visualization of a map with POI's using OpenStreetMap.",
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
