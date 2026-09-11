export const springs = {
  snappy: { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 },
  soft: { type: 'spring', stiffness: 200, damping: 26, mass: 1 },
  weighty: { type: 'spring', stiffness: 120, damping: 24, mass: 1.4 },
};

export const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: springs.soft },
};

export const fadeScale = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: springs.snappy },
};

export const revealStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// Viewport config shared by every scroll-triggered reveal, so entrance
// thresholds stay consistent across sections.
export const viewport = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' };
