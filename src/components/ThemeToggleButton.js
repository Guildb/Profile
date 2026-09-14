import React from 'react';
import { flushSync } from 'react-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const prefersReduced = usePrefersReducedMotion();

  const handleToggle = () => {
    if (!document.startViewTransition || prefersReduced) {
      toggleTheme();
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => toggleTheme());
    });
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-ink shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110 dark:bg-canvas/70 dark:shadow-black/40"
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggleButton;
