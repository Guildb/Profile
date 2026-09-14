import React from "react";
import * as motionReact from "motion/react";
import SectionHeading from "./SectionHeading";
import Reveal from "./ui/Reveal";
import GlassPanel from "./ui/GlassPanel";
import { revealUp } from "../lib/motion";
import { skillGroups } from "../data/skills";

const { motion } = motionReact;

// First and fourth tiles run wide, second and third narrow, producing the
// asymmetric rhythm without resorting to fixed-height masonry.
const spans = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3"];

const Skills = () => {
  return (
    <div className="text-center py-12 px-4">
      <SectionHeading id="skills-heading" eyebrow="What I do" title="Skills" />
      <Reveal stagger className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
        {skillGroups.map((group, index) => (
          <GlassPanel
            key={group.title}
            as={motion.div}
            variants={revealUp}
            className={`group relative p-6 text-left text-ink ${spans[index]}`}
          >
            {/* Hover glow: a static shadow on its own layer, faded in by
                opacity. Transitioning box-shadow on the panel itself would
                repaint its backdrop-filtered glass every frame. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-0 shadow-[0_0_40px_-8px_rgb(var(--accent)/0.35)] transition-opacity duration-300 group-hover:opacity-100"
            />
            <h3 className="font-display text-2xl font-semibold">{group.title}</h3>
            <span
              aria-hidden="true"
              className="mb-4 mt-2 block h-0.5 w-16 origin-left scale-x-0 bg-gradient-to-r from-aurora1 to-aurora2 transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
            <ul className="list-none space-y-3">
              {group.items.map(({ icon: Icon, label, color }) => (
                <li key={label} className="flex items-center">
                  <Icon className={`mr-3 text-xl ${color}`} />
                  {label}
                </li>
              ))}
            </ul>
          </GlassPanel>
        ))}
      </Reveal>
    </div>
  );
};

export default Skills;
