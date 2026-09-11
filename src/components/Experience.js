import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaServer,
  FaHeadset,
} from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const EducationExperience = () => {
  const experiences = [
    {
      title: "Web Support Engineer",
      company: "ICAAL",
      location: "Southampton, UK",
      description:
        "Working as part of ICAAL's web team, supporting and developing client websites — diagnosing and resolving issues, building new features and keeping sites fast, secure and up to date.",
      date: "Nov 2025 - Present",
      icon: FaHeadset,
      current: true,
    },
    {
      title: "Front-End/Vue.js",
      company: "DataMango",
      location: "Southampton, UK",
      description:
        "In collaboration with DataMango, we executed and delivered a carbon footprint measuring project. I was responsible for the development of the front end and integration with the back-end using Vue.js, Tailwind for styling and vue-chartjs for data visualization.",
      date: "2024",
      icon: FaLaptopCode,
    },
    {
      title: "Undergraduate Degree",
      location: "Southampton, UK",
      description:
        "Graduated with honours first-class degree in (BCS) Software Engineering",
      date: "2021 - 2024",
      icon: FaGraduationCap,
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
    <div className="py-12 px-4">
      <SectionHeading eyebrow="My journey" title="Experience" />
      <VerticalTimeline>
        {experiences.map((experience, index) => (
          <VerticalTimelineElement
            key={index}
            contentStyle={{
              background: "rgb(var(--surface) / var(--surface-alpha))",
              color: "rgb(var(--ink))",
              borderRadius: "1rem",
              borderTop: `4px solid ${
                experience.current ? "rgb(var(--aurora-2))" : "rgb(var(--aurora-1))"
              }`,
              boxShadow: "0 10px 30px rgba(2, 6, 23, 0.15)",
            }}
            contentArrowStyle={{
              borderRight: "7px solid rgb(var(--surface) / var(--surface-alpha))",
            }}
            date={experience.date}
            dateClassName="font-semibold lg:text-muted"
            iconStyle={{
              background: experience.current
                ? "linear-gradient(135deg, rgb(var(--aurora-1)), rgb(var(--aurora-2)))"
                : "rgb(var(--surface) / var(--surface-alpha))",
              color: "#fff",
              boxShadow:
                "0 0 0 4px rgb(var(--canvas)), inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)",
            }}
            icon={<experience.icon />}
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="vertical-timeline-element-title text-xl font-bold">
                {experience.title}
              </h3>
              {experience.current && (
                <span className="rounded-full bg-gradient-to-r from-aurora1 to-aurora2 px-3 py-0.5 text-xs font-semibold text-white">
                  Present
                </span>
              )}
            </div>
            <h4 className="vertical-timeline-element-subtitle text-md font-semibold text-gray-400">
              {experience.company
                ? `${experience.company} · ${experience.location}`
                : experience.location}
            </h4>
            <p>{experience.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default EducationExperience;
