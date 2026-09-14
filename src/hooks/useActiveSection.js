import { useEffect, useState } from 'react';

const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(',');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return undefined;

    // Highest-intersection-ratio favoured short sections over tall ones (a
    // tall section can cap out well under 1.0 even while filling the
    // viewport, letting a short neighbour "win" at a higher ratio). Instead,
    // shrink the observing root to a thin band roughly at the vertical
    // centre of the viewport (45% down) and treat whichever section crosses
    // that line as active — this matches what the eye actually reads as
    // "current" regardless of section height.
    const crossing = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          crossing.set(entry.target.id, entry.isIntersecting);
        });
        // Prefer document order so the result is deterministic when more
        // than one section briefly reports crossing the line in the same
        // batch. If nothing is currently crossing it (e.g. a fast
        // programmatic scroll skipped the line between frames), keep the
        // previously active section rather than clearing it.
        const current = ids.find((id) => crossing.get(id));
        if (current) setActive(current);
      },
      { rootMargin: '-45% 0px -55% 0px', threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
};

export default useActiveSection;
