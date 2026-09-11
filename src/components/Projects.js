import React from "react";
import {
  FaPython,
  FaVuejs,
  FaDocker,
  FaNodeJs,
  FaBootstrap,
  FaDatabase,
  FaFlask,
  FaJs,
} from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "Matching Project Allocation System",
    description:
      "This was my final year project, where I developed an application to automate a manual process at my university. The web application allowed students to add their idea for the final year project and automatically be assigned a tutor, and the tutor could suggest projects for students.",
    tech: [
      { icon: FaPython, label: "Python", color: "text-yellow-500" },
      { icon: FaVuejs, label: "Vue.js", color: "text-emerald-500" },
      { icon: FaJs, label: "JavaScript", color: "text-yellow-400" },
      { icon: FaDocker, label: "Docker", color: "text-sky-500" },
      { icon: FaFlask, label: "Flask", color: "text-slate-400" },
      { icon: FaDatabase, label: "PostgreSQL", color: "text-sky-600" },
    ],
  },
  {
    title: "3DPrinting",
    description:
      "Managing 3D printing orders as part of a university project that gives you access to each order and the file that needs to be printed.",
    tech: [
      { icon: FaNodeJs, label: "Node.js", color: "text-green-500" },
      { icon: FaBootstrap, label: "Bootstrap", color: "text-purple-500" },
      { icon: FaJs, label: "JavaScript", color: "text-yellow-400" },
      { icon: FaDatabase, label: "MongoDB", color: "text-green-500" },
    ],
  },
];

const Projects = () => {
  return (
    <div className="text-center py-12 px-4">
      <SectionHeading eyebrow="What I've built" title="My Projects" />
      <div className="flex flex-col items-center space-y-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="w-full overflow-hidden rounded-2xl border border-hairline bg-surface shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:w-2/3"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-aurora1 to-aurora2" />
            <div className="p-6">
              <h3 className="font-display text-2xl font-semibold mb-4">
                {project.title}
              </h3>
              <p className="mb-6">{project.description}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {project.tech.map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-sm font-medium text-ink"
                  >
                    <Icon className={`text-lg ${color}`} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
