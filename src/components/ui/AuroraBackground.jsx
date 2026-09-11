import React, { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const AuroraBackground = ({ className = '' }) => {
  const prefersReduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '10%' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const animating = visible && !prefersReduced;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`aurora-layer pointer-events-none absolute inset-0 overflow-hidden ${className}`}
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
