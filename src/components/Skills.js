import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import SectionHeading from "./SectionHeading";
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
} from "react-icons/fa";

const skillGroups = [
  {
    title: "General Skills",
    items: [
      { icon: FaPalette, label: "Web Design", color: "text-pink-500" },
      { icon: FaLightbulb, label: "Design Thinking", color: "text-amber-400" },
      { icon: FaLaptopCode, label: "Full Stack Development", color: "text-blue-500" },
      { icon: FaTools, label: "Problem Solving", color: "text-emerald-500" },
      { icon: FaLaptopCode, label: "Computer Literacy", color: "text-sky-500" },
      { icon: FaLaptopCode, label: "Software Development", color: "text-indigo-400" },
      { icon: FaServer, label: "Database Design and Management", color: "text-cyan-500" },
    ],
  },
  {
    title: "Technologies and Frameworks",
    items: [
      { icon: FaReact, label: "React", color: "text-cyan-400" },
      { icon: FaVuejs, label: "Vue.js", color: "text-emerald-500" },
      { icon: FaWind, label: "Tailwind", color: "text-sky-400" },
      { icon: FaFlask, label: "Flask", color: "text-slate-400" },
      { icon: FaNodeJs, label: "Node.js", color: "text-green-500" },
      { icon: FaServer, label: "Express", color: "text-gray-400" },
    ],
  },
  {
    title: "Programming Languages",
    items: [
      { icon: FaPython, label: "Python", color: "text-yellow-500" },
      { icon: FaJava, label: "Java", color: "text-red-500" },
      { icon: FaJsSquare, label: "JavaScript", color: "text-yellow-400" },
    ],
  },
  {
    title: "Databases",
    items: [
      { icon: FaDatabase, label: "PostgreSQL", color: "text-sky-600" },
      { icon: FaDatabase, label: "MySQL", color: "text-orange-400" },
      { icon: FaDatabase, label: "SQLite", color: "text-blue-400" },
      { icon: FaDatabase, label: "MongoDB", color: "text-green-500" },
    ],
  },
];

const Skills = () => {
  const { darkMode } = useTheme();

  return (
    <div className="text-center py-12 px-4">
      <SectionHeading eyebrow="What I do" title="Skills" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className={`rounded-2xl border p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
              darkMode
                ? "border-slate-600/40 bg-slate-700/60"
                : "border-slate-200 bg-white"
            }`}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="font-display text-2xl font-semibold mb-4">
              {group.title}
            </h3>
            <ul className="list-none space-y-3">
              {group.items.map(({ icon: Icon, label, color }) => (
                <li key={label} className="flex items-center">
                  <Icon className={`mr-3 text-xl ${color}`} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
