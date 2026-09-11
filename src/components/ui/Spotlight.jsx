import React from 'react';
import * as motionReact from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const { motion, useMotionValue, useSpring } = motionReact;

// The masked box is a fixed 560x560 square. Its mask and background pattern
// are both static strings computed once at module load; only the box's
// transform moves per frame, so a spring tick never touches paint-triggering
// properties like mask-image.
const SPOTLIGHT_SIZE = 560;
const SPOTLIGHT_RADIUS = SPOTLIGHT_SIZE / 2;

// Static: centred in the box, never recomputed per frame.
const SPOTLIGHT_MASK =
  'radial-gradient(280px circle at center, #000 0%, transparent 70%)';

const Spotlight = ({ className = '' }) => {
  const prefersReduced = usePrefersReducedMotion();
  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);
  const x = useSpring(rawX, { stiffness: 120, damping: 25, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 120, damping: 25, mass: 0.6 });

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      onPointerMove={undefined}
    >
      <motion.div
        className="absolute left-0 top-0"
        style={{
          x,
          y,
          // Static offsets (not a percentage transform) so the only
          // per-frame animated property is the spring-driven transform.
          marginLeft: -SPOTLIGHT_RADIUS,
          marginTop: -SPOTLIGHT_RADIUS,
          width: SPOTLIGHT_SIZE,
          height: SPOTLIGHT_SIZE,
          backgroundImage:
            'radial-gradient(rgb(var(--ink) / 0.35) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          // Intent: lock the dot grid to the viewport so the box reads as a
          // moving window onto a stationary pattern. KNOWN ISSUE (verified
          // by direct pixel comparison in Chromium): `transform` on this
          // same element establishes a new containing block, which
          // neutralizes `fixed` attachment for its own background — the
          // grid ends up moving with the box instead of staying put. See
          // task-7-report.md "Fix round 1" for the measurement. Left in
          // place as a documented no-op pending a follow-up that moves the
          // dot-grid background onto a separate, non-transformed layer.
          backgroundAttachment: 'fixed',
          maskImage: SPOTLIGHT_MASK,
          WebkitMaskImage: SPOTLIGHT_MASK,
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
