import React from 'react';

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")";

const Grain = ({ className = '' }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none fixed inset-0 z-[3] opacity-[0.05] mix-blend-overlay ${className}`}
    style={{ backgroundImage: NOISE, backgroundRepeat: 'repeat' }}
  />
);

export default Grain;
