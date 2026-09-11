import {
  FaGraduationCap,
  FaLaptopCode,
  FaServer,
  FaHeadset,
} from "react-icons/fa";

export const experiences = [
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
