import React from 'react';
import { Link } from 'react-scroll';
import { useTheme } from '../contexts/ThemeContext';

const navItems = [
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'projects', label: 'Projects' },
  { to: 'experience', label: 'Experience' },
  { to: 'interests', label: 'Interests' },
  { to: 'contact-info', label: 'Contact' },
];

const Header = () => {
  const { darkMode } = useTheme();

  return (
    <header className="fixed top-0 left-0 z-40 w-full py-4">
      <nav className="container mx-auto flex justify-center px-4">
        <div
          className={`flex flex-wrap justify-center gap-1 rounded-full border px-2 py-1 shadow-lg backdrop-blur-md ${
            darkMode
              ? 'border-white/10 bg-slate-900/60 text-white'
              : 'border-white/60 bg-white/60 text-slate-800'
          }`}
        >
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              spy={true}
              smooth={true}
              duration={1000}
              offset={-80}
              activeClass={
                darkMode ? 'bg-white/10 text-cyan-300' : 'bg-blue-500/10 text-blue-600'
              }
              className={`cursor-pointer rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                darkMode ? 'hover:text-cyan-300' : 'hover:text-blue-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
