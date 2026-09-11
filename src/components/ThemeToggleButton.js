import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-ink shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110"
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggleButton;
