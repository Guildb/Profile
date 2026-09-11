/** @type {import('tailwindcss').Config} */
const withAlpha = (variable) => ({ opacityValue }) =>
  opacityValue === undefined
    ? `rgb(var(${variable}))`
    : `rgb(var(${variable}) / ${opacityValue})`;

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: withAlpha('--canvas'),
        surface: 'rgb(var(--surface) / var(--surface-alpha))',
        hairline: 'rgb(var(--hairline) / var(--hairline-alpha))',
        aurora1: withAlpha('--aurora-1'),
        aurora2: withAlpha('--aurora-2'),
        accent: withAlpha('--accent'),
        ink: withAlpha('--ink'),
        muted: withAlpha('--muted'),
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.75rem, 11vw, 8.5rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        section: ['clamp(1.85rem, 4.5vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
};
