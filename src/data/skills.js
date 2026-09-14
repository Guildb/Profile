import {
  FaLaptopCode,
  FaPalette,
  FaLightbulb,
  FaServer,
  FaDatabase,
  FaPython,
  FaJava,
  FaJsSquare,
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaWind,
  FaFlask,
  FaTools,
  FaWordpress,
  FaLaravel,
  FaPhp,
  FaSearch,
} from "react-icons/fa";

// Within each group, the stack used day to day at ICAAL leads, followed by
// earlier academic and project experience.
export const skillGroups = [
  {
    title: "General Skills",
    items: [
      { icon: FaPalette, label: "Web Design", color: "text-pink-500" },
      { icon: FaSearch, label: "Technical SEO", color: "text-teal-400" },
      { icon: FaLaptopCode, label: "Full Stack Development", color: "text-blue-500" },
      { icon: FaLightbulb, label: "Design Thinking", color: "text-amber-400" },
      { icon: FaTools, label: "Problem Solving", color: "text-emerald-500" },
      { icon: FaLaptopCode, label: "Computer Literacy", color: "text-sky-500" },
      { icon: FaLaptopCode, label: "Software Development", color: "text-indigo-400" },
      { icon: FaServer, label: "Database Design and Management", color: "text-cyan-500" },
    ],
  },
  {
    title: "Technologies and Frameworks",
    items: [
      { icon: FaWordpress, label: "WordPress", color: "text-sky-600" },
      { icon: FaLaravel, label: "Laravel", color: "text-red-500" },
      { icon: FaWind, label: "Tailwind", color: "text-sky-400" },
      { icon: FaReact, label: "React", color: "text-cyan-400" },
      { icon: FaVuejs, label: "Vue.js", color: "text-emerald-500" },
      { icon: FaNodeJs, label: "Node.js", color: "text-green-500" },
      { icon: FaServer, label: "Express", color: "text-gray-400" },
      { icon: FaFlask, label: "Flask", color: "text-slate-400" },
    ],
  },
  {
    title: "Programming Languages",
    items: [
      { icon: FaPhp, label: "PHP", color: "text-indigo-400" },
      { icon: FaJsSquare, label: "JavaScript", color: "text-yellow-400" },
      { icon: FaPython, label: "Python", color: "text-yellow-500" },
      { icon: FaJava, label: "Java", color: "text-red-500" },
    ],
  },
  {
    title: "Databases",
    items: [
      { icon: FaDatabase, label: "MySQL", color: "text-orange-400" },
      { icon: FaDatabase, label: "PostgreSQL", color: "text-sky-600" },
      { icon: FaDatabase, label: "SQLite", color: "text-blue-400" },
      { icon: FaDatabase, label: "MongoDB", color: "text-green-500" },
    ],
  },
];
