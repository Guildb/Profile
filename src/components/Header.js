import React from 'react';
import * as motionReact from 'motion/react';
import useActiveSection from '../hooks/useActiveSection';
import { springs } from '../lib/motion';

const { motion } = motionReact;

const navItems = [
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'projects', label: 'Projects' },
  { to: 'experience', label: 'Experience' },
  { to: 'interests', label: 'Interests' },
  { to: 'contact-info', label: 'Contact' },
];

const sectionIds = ['hero', ...navItems.map(({ to }) => to)];

const Header = () => {
  const activeId = useActiveSection(sectionIds);

  return (
    <header className="fixed top-0 left-0 z-40 w-full py-4 pr-16 sm:pr-0">
      <nav className="container mx-auto flex justify-center px-4">
        <div className="flex flex-wrap justify-center gap-1 rounded-full border border-hairline bg-surface px-2 py-1 text-ink shadow-lg backdrop-blur-md dark:bg-canvas/70 dark:shadow-black/40">
          {navItems.map(({ to, label }) => {
            const isActive = activeId === to;
            return (
              <a
                key={to}
                href={`#${to}`}
                aria-current={isActive ? 'true' : undefined}
                className="relative shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink transition-colors duration-300 hover:text-accent"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    transition={springs.snappy}
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-aurora1 to-aurora2 opacity-20"
                  />
                )}
                {label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;
