import React from 'react';

// The gradient hairline is a padded span masked down to its 1px padding ring:
// the first mask layer is clipped to the content box, the second covers the
// whole border box, and compositing them with exclude/xor leaves only the ring. It sits at
// -z-10 inside the panel's own stacking context (isolate), so it paints above
// the glass fill but beneath the panel's content.
const HAIRLINE_MASK = 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)';

const GlassPanel = ({ as: Component = 'div', className = '', children, ...rest }) => (
  <Component
    className={`relative isolate rounded-3xl border border-hairline bg-surface shadow-[0_20px_60px_-20px_rgb(0_0_0/0.45)] backdrop-blur-xl backdrop-saturate-150 ${className}`}
    {...rest}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-60"
      style={{
        background:
          'linear-gradient(140deg, rgb(var(--ink) / 0.14), transparent 40%, transparent 60%, rgb(var(--ink) / 0.06))',
        // The mask shorthand, not mask-image: content-box is a mask-clip
        // value and makes a mask-image declaration invalid. The composite
        // properties must come after the shorthands, which reset them.
        mask: HAIRLINE_MASK,
        WebkitMask: HAIRLINE_MASK,
        maskComposite: 'exclude',
        WebkitMaskComposite: 'xor',
        padding: '1px',
      }}
    />
    {children}
  </Component>
);

export default GlassPanel;
