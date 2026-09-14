import React from 'react';
import * as motionReact from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const { motion, useMotionValue, useSpring, useTransform } = motionReact;

// The masked box is a fixed 560x560 square, positioned via a spring so its
// transform (not its mask or background) moves per pointer frame. The dot
// grid lives on an inner layer that counter-translates by the exact negation
// of the outer box's motion, so it reads as a stationary field revealed by a
// moving aperture instead of a pattern glued to the cursor. Both layers only
// ever animate `transform` — the mask and the background image are static
// strings, never recomputed per frame.
//
// Positioning maths: the outer box sits at (x - 280, y - 280) within the
// container (the -280 margin recentres it on the pointer), so the inner
// layer must offset by (280 - x, 280 - y) to put its own origin back at the
// container's (0, 0). The static +280 margins supply the constant part; the
// negated springs supply the -x/-y part.
const Spotlight = ({ className = '', rawX: externalRawX, rawY: externalRawY }) => {
  const prefersReduced = usePrefersReducedMotion();
  // The layer itself is pointer-events: none, so it can never observe
  // pointer movement directly. A parent that owns the pointer handler (via
  // the exported useSpotlightTracking helper) can pass its own MotionValues
  // in as rawX/rawY; when it doesn't, fall back to local ones so the
  // component still renders standalone.
  const localRawX = useMotionValue(-500);
  const localRawY = useMotionValue(-500);
  const rawX = externalRawX ?? localRawX;
  const rawY = externalRawY ?? localRawY;
  const x = useSpring(rawX, { stiffness: 120, damping: 25, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 120, damping: 25, mass: 0.6 });
  const negX = useTransform(x, (v) => -v);
  const negY = useTransform(y, (v) => -v);

  if (prefersReduced) return null;

  const MASK = 'radial-gradient(circle at center, #000 0%, transparent 70%)';
  const DOTS = 'radial-gradient(rgb(var(--ink) / 0.35) 1px, transparent 1px)';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute left-0 top-0 h-[560px] w-[560px] overflow-hidden will-change-transform"
        style={{
          x,
          y,
          marginLeft: -280,
          marginTop: -280,
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      >
        {/* Counter-translates its parent so the grid reads as stationary while
            the aperture moves. Both layers animate transform only — the mask
            and the background are static strings. */}
        <motion.div
          className="absolute left-0 top-0 h-screen w-screen will-change-transform"
          style={{
            x: negX,
            y: negY,
            marginLeft: 280,
            marginTop: 280,
            backgroundImage: DOTS,
            backgroundSize: '26px 26px',
          }}
        />
      </motion.div>
    </div>
  );
};

export const useSpotlightTracking = (rawX, rawY) => (event) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  rawX.set(event.clientX - bounds.left);
  rawY.set(event.clientY - bounds.top);
};

export default Spotlight;
