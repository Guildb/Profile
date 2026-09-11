import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SectionHeading from "./SectionHeading";
import { experiences } from "../data/experience";

const CARD_SURFACE = "rgb(var(--surface) / var(--surface-alpha))";

const EducationExperience = () => {
  return (
    <div className="py-12 px-4">
      <SectionHeading id="experience-heading" eyebrow="My journey" title="Experience" />
      <VerticalTimeline>
        {experiences.map((experience, index) => (
          <VerticalTimelineElement
            key={index}
            contentStyle={{
              background: CARD_SURFACE,
              color: "rgb(var(--ink))",
              borderRadius: "1rem",
              borderTop: `4px solid ${
                experience.current ? "rgb(var(--aurora-2))" : "rgb(var(--aurora-1))"
              }`,
              boxShadow: "0 10px 30px rgba(2, 6, 23, 0.15)",
            }}
            contentArrowStyle={{
              borderRight: `7px solid ${CARD_SURFACE}`,
            }}
            date={experience.date}
            dateClassName="font-semibold lg:text-muted"
            iconStyle={{
              background: experience.current
                ? "linear-gradient(135deg, rgb(var(--aurora-1)), rgb(var(--accent)))"
                : "rgb(var(--aurora-1))",
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
            <h4 className="vertical-timeline-element-subtitle text-md font-semibold text-muted">
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
