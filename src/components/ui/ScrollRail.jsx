import React from 'react';
import * as motionReact from 'motion/react';

const { motion, useScroll, useSpring } = motionReact;

// A decorative, fixed right-edge progress rail: one dot per section plus a
// fill whose scaleY tracks page scroll progress through a spring. It never
// drives navigation itself — the header owns that — so it is aria-hidden and
// pointer-events-none, and hidden below `lg` where there is no room for it.
const ScrollRail = ({ sectionCount = 1 }) => {
  const { scrollYProgress } = useScroll();
  const fillScale = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:flex"
    >
      <div className="relative h-48 w-px bg-hairline">
        <motion.div
          className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-aurora1 to-aurora2"
          style={{ scaleY: fillScale }}
        />
        <div className="absolute inset-0 flex flex-col justify-between">
          {Array.from({ length: sectionCount }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={index} className="-ml-[3px] h-[7px] w-[7px] rounded-full bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollRail;
