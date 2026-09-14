import React, { useRef } from "react";
import * as motionReact from "motion/react";
import SectionHeading from "./SectionHeading";
import Reveal from "./ui/Reveal";
import GlassPanel from "./ui/GlassPanel";
import { springs } from "../lib/motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import { experiences } from "../data/experience";

const { motion, useScroll, useSpring } = motionReact;

const TRACK_POSITION = "left-6 lg:left-1/2";

const Experience = () => {
  const timelineRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const fillScale = useSpring(scrollYProgress, springs.soft);

  return (
    <div className="py-12 px-4">
      <SectionHeading id="experience-heading" eyebrow="My journey" title="Experience" />

      <div ref={timelineRef} className="relative mx-auto max-w-3xl">
        {/* Track: the dim base line the fill draws over. */}
        <div
          aria-hidden="true"
          className={`absolute top-0 h-full w-0.5 -translate-x-1/2 bg-hairline/40 ${TRACK_POSITION}`}
        />
        {/* Fill: scaleY tracks scroll progress through the section, never height. */}
        <motion.div
          aria-hidden="true"
          className={`absolute top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-aurora1 to-aurora2 ${TRACK_POSITION}`}
          style={
            prefersReducedMotion
              ? { scaleY: 1, transformOrigin: "top" }
              : { scaleY: fillScale, transformOrigin: "top" }
          }
        />

        <ol className="relative list-none space-y-12">
          {experiences.map((experience) => {
            const Icon = experience.icon;
            // The "Present" pill already conveys the role is ongoing, so the
            // date line drops the trailing "- Present" to avoid saying it twice.
            const displayDate = experience.current
              ? experience.date.replace(/\s*-\s*present$/i, "")
              : experience.date;
            return (
              <li key={experience.title} className="relative pl-16 lg:pl-[calc(50%+2.5rem)]">
                <span
                  aria-hidden="true"
                  className={`absolute top-1 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-white shadow-lg ${TRACK_POSITION} ${
                    experience.current ? "bg-gradient-to-br from-aurora1 to-accent" : ""
                  }`}
                  style={experience.current ? undefined : { background: "rgb(var(--aurora-1))" }}
                >
                  <Icon />
                </span>

                <Reveal as="div">
                  <GlassPanel className="p-6 text-left text-ink">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl font-bold">{experience.title}</h3>
                      {experience.current && (
                        <span className="rounded-full bg-gradient-to-r from-aurora1 to-aurora2 px-3 py-0.5 text-xs font-semibold text-white">
                          Present
                        </span>
                      )}
                    </div>
                    <h4 className="text-md font-semibold text-muted">
                      {experience.company
                        ? `${experience.company} · ${experience.location}`
                        : experience.location}
                    </h4>
                    <p className="mt-1 text-sm font-semibold text-accent">{displayDate}</p>
                    <p className="mt-3">{experience.description}</p>
                  </GlassPanel>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Experience;
