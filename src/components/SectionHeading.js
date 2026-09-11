import React from "react";

const SectionHeading = ({ id, eyebrow, title }) => {
  return (
    <div className="text-center mb-12">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
        {eyebrow}
      </span>
      <h2 id={id} className="font-display text-section font-bold mt-2">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-aurora1 to-aurora2" />
    </div>
  );
};

export default SectionHeading;
