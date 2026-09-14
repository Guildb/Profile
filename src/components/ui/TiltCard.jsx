import React from 'react';
import * as motionReact from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } = motionReact;

const TiltCard = ({ className = '', maxTilt = 9, children }) => {
  const prefersReduced = usePrefersReducedMotion();

  // Normalised pointer position within the card, -0.5 .. 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 260,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 260,
    damping: 24,
  });

  const glare = useMotionTemplate`radial-gradient(500px circle at ${glareX}% ${glareY}%, rgb(var(--ink) / 0.16), transparent 55%)`;

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - bounds.left) / bounds.width;
    const relY = (event.clientY - bounds.top) / bounds.height;
    px.set(relX - 0.5);
    py.set(relY - 0.5);
    glareX.set(relX * 100);
    glareY.set(relY * 100);
  };

  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      // transformPerspective folds perspective() into this element's own
      // transform. The CSS perspective property only affects children, so
      // it left the card's rotation flat, with no foreshortening.
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={`relative ${className}`}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{ backgroundImage: glare }}
      />
    </motion.div>
  );
};

export default TiltCard;
