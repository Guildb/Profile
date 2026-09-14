import React from 'react';
import * as motionReact from 'motion/react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const { motion, useMotionValue, useSpring, useTransform } = motionReact;

// The specular highlight is a fixed-size blob with a static gradient, moved
// by transform. Rewriting a background-image per pointer frame would repaint
// the whole card, including its backdrop-filtered glass, on every move.
// 550px across fading to transparent at its edge matches the earlier
// "500px circle ... transparent 55%" falloff.
const GLARE = 'radial-gradient(circle closest-side, rgb(var(--ink) / 0.16), transparent)';
const GLARE_SIZE = 550;

const TiltCard = ({ className = '', maxTilt = 9, children }) => {
  const prefersReduced = usePrefersReducedMotion();

  // Normalised pointer position within the card, -0.5 .. 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  // Glare offset in px from the card's centre
  const glareX = useMotionValue(0);
  const glareY = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 260,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 260,
    damping: 24,
  });

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relY = (event.clientY - bounds.top) / bounds.height - 0.5;
    px.set(relX);
    py.set(relY);
    glareX.set(relX * bounds.width);
    glareY.set(relY * bounds.height);
  };

  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
    glareX.set(0);
    glareY.set(0);
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
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
      >
        <motion.span
          className="absolute left-1/2 top-1/2 block rounded-full will-change-transform"
          style={{
            width: GLARE_SIZE,
            height: GLARE_SIZE,
            marginLeft: -GLARE_SIZE / 2,
            marginTop: -GLARE_SIZE / 2,
            x: glareX,
            y: glareY,
            backgroundImage: GLARE,
          }}
        />
      </span>
    </motion.div>
  );
};

export default TiltCard;
