import React from "react";
import About from "./About";
import ContactInfo from "./ContactInfo";
import Interests from "./Interests";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import AuroraBackground from "./ui/AuroraBackground";

const sections = [
  { id: "about", Component: About },
  { id: "skills", Component: Skills },
  { id: "projects", Component: Projects },
  { id: "experience", Component: Experience },
  { id: "interests", Component: Interests },
  { id: "contact-info", Component: ContactInfo },
];

// Anchor landing: each section opens with 3rem of padding before its eyebrow
// and heading, and the fixed nav pill ends 60px from the viewport top. A 24px
// scroll margin therefore puts the eyebrow at 72px (clear of the pill) and the
// heading itself at ~104px, at every breakpoint.
const Profile = () => (
  // `isolate` keeps the viewport-fixed shell aurora inside this wrapper's
  // stacking context, so it sits beneath the hero (z-10) and footer (z-10)
  // rather than painting over them.
  <div className="relative isolate bg-canvas">
    <AuroraBackground fixed />
    <div className="relative z-[2] container mx-auto px-4">
      {sections.map(({ id, Component }) => (
        <section
          key={id}
          id={id}
          aria-labelledby={`${id}-heading`}
          className="scroll-mt-6"
        >
          <Component />
        </section>
      ))}
    </div>
  </div>
);

export default Profile;
