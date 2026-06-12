import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggleButton = () => {
  const { darkMode, setDarkMode } = useTheme();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // The re-render rewrites className on AOS elements, wiping the
    // aos-animate class; AOS only re-applies it on a scroll event.
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 150);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 focus:outline-none ${
        darkMode
          ? 'border-white/10 bg-slate-800/80 text-yellow-300'
          : 'border-white/60 bg-white/80 text-slate-700'
      }`}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggleButton;
