import React from "react";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "../data/skills";

const Skills = () => {
  return (
    <div className="text-center py-12 px-4">
      <SectionHeading eyebrow="What I do" title="Skills" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-hairline bg-surface p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
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
