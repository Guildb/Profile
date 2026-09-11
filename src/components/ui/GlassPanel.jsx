import React from 'react';

const GlassPanel = ({ as: Component = 'div', className = '', children, ...rest }) => (
  <Component
    className={`relative rounded-3xl border border-hairline bg-surface shadow-[0_20px_60px_-20px_rgb(0_0_0/0.45)] backdrop-blur-xl backdrop-saturate-150 ${className}`}
    {...rest}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-3xl opacity-60"
      style={{
        background:
          'linear-gradient(140deg, rgb(var(--ink) / 0.14), transparent 40%, transparent 60%, rgb(var(--ink) / 0.06))',
        maskImage: 'linear-gradient(#000, #000)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        padding: '1px',
      }}
    />
    {children}
  </Component>
);

export default GlassPanel;
