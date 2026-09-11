import React from 'react';
import * as motionReact from 'motion/react';
import { revealStagger, revealUp, viewport } from '../../lib/motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const { motion } = motionReact;

const Reveal = ({ as = 'div', stagger = false, children, ...rest }) => {
  const prefersReduced = usePrefersReducedMotion();
  const Component = motion[as] ?? motion.div;

  if (prefersReduced) {
    const Plain = as;
    return <Plain {...rest}>{children}</Plain>;
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger ? revealStagger : revealUp}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Reveal;
