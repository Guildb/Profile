import React, { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

// `fixed` picks exactly one position utility. Position must never arrive via
// className: Tailwind emits .fixed before .absolute, so a conflicting class
// loses silently and the layer scrolls away with the document.
const AuroraBackground = ({ fixed = false, className = '' }) => {
  const prefersReduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // A viewport-fixed layer always intersects the viewport, so observing it
    // would never pause the animation. Observe the container it decorates
    // instead: the shell aurora then rests while that container is off
    // screen (for example while the hero fills the viewport).
    const node = fixed ? ref.current?.parentElement : ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      // Scrolling layer: grow the root by 10% so the animation starts
      // slightly before the layer scrolls into view rather than popping in
      // mid-drift. Fixed layer: it is only ever revealed a sliver at a time
      // as its container scrolls in, so no lead is needed; the 1px inset
      // stops a container that merely touches the viewport's bottom edge
      // (the Profile shell below a 100vh hero) from counting as visible.
      { rootMargin: fixed ? '0px 0px -1px 0px' : '10%' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [fixed]);

  const animating = visible && !prefersReduced;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`aurora-layer pointer-events-none ${fixed ? 'fixed' : 'absolute'} inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute -left-[15%] -top-[20%] h-[70vmax] w-[70vmax] rounded-full opacity-60 blur-[90px] will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgb(var(--aurora-1)) 0%, transparent 65%)',
          animation: animating ? 'aurora-drift-a 28s ease-in-out infinite' : 'none',
        }}
      />
      <div
        className="absolute -right-[10%] top-[10%] h-[60vmax] w-[60vmax] rounded-full opacity-50 blur-[100px] will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgb(var(--aurora-2)) 0%, transparent 65%)',
          animation: animating ? 'aurora-drift-b 34s ease-in-out infinite' : 'none',
        }}
      />
      <div
        className="absolute bottom-[-25%] left-[25%] h-[55vmax] w-[55vmax] rounded-full opacity-30 blur-[110px] will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgb(var(--accent)) 0%, transparent 70%)',
          animation: animating ? 'aurora-drift-c 41s ease-in-out infinite' : 'none',
        }}
      />
    </div>
  );
};

export default AuroraBackground;
