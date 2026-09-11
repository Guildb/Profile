import React from "react";
import SectionHeading from "./SectionHeading";
import { projects } from "../data/projects";

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
