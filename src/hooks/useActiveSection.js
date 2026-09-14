import { useEffect, useState } from 'react';

const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(',');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return undefined;

    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let best = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
};

export default useActiveSection;
