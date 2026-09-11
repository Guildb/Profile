import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(
    () => window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = (event) => setPrefersReduced(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
};

export default usePrefersReducedMotion;
