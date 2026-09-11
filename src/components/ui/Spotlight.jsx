import React from 'react';
import * as motionReact from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const { motion, useMotionValue, useMotionTemplate, useSpring } = motionReact;

const Spotlight = ({ className = '' }) => {
  const prefersReduced = usePrefersReducedMotion();
  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);
  const x = useSpring(rawX, { stiffness: 120, damping: 25, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 120, damping: 25, mass: 0.6 });

  const mask = useMotionTemplate`radial-gradient(280px circle at ${x}px ${y}px, #000 0%, transparent 70%)`;

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      onPointerMove={undefined}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgb(var(--ink) / 0.35) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
  );
};

export const useSpotlightTracking = (rawX, rawY) => (event) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  rawX.set(event.clientX - bounds.left);
  rawY.set(event.clientY - bounds.top);
};

export default Spotlight;
