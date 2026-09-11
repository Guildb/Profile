import React from "react";
import * as motionReact from "motion/react";
import SectionHeading from "./SectionHeading";
import Reveal from "./ui/Reveal";
import GlassPanel from "./ui/GlassPanel";
import { springs, revealUp } from "../lib/motion";
import { interestGroups } from "../data/interests";

const { motion } = motionReact;

const Interests = () => {
  return (
    <div className="text-center py-12 px-4">
      <SectionHeading
        id="interests-heading"
        eyebrow="A little bit more about myself"
        title="Interests"
      />
      <Reveal stagger className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {interestGroups.map((group) => (
          <GlassPanel
            key={group.title}
            as={motion.div}
            variants={revealUp}
            className="p-6 text-left text-ink"
          >
            <h3 className="font-display text-2xl font-semibold mb-4">
              {group.title}
            </h3>
            <ul className="list-none space-y-3">
              {group.items.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center">
                  <motion.span
                    whileHover={{ rotate: -8, scale: 1.12 }}
                    transition={springs.snappy}
                    className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"
                  >
                    <Icon />
                  </motion.span>
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

export default Interests;
