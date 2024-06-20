import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggleButton = () => {
  const { darkMode, setDarkMode } = useTheme();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggleButton;
