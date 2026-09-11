import React from 'react';

const navItems = [
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'projects', label: 'Projects' },
  { to: 'experience', label: 'Experience' },
  { to: 'interests', label: 'Interests' },
  { to: 'contact-info', label: 'Contact' },
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-40 w-full py-4">
      <nav className="container mx-auto flex justify-center px-4">
        <div className="flex flex-wrap justify-center gap-1 rounded-full border border-hairline bg-surface px-2 py-1 text-ink shadow-lg backdrop-blur-md">
          {navItems.map(({ to, label }) => (
            <a
              key={to}
              href={`#${to}`}
              className="cursor-pointer rounded-full px-3 py-2 text-sm font-medium text-ink transition-colors duration-300 hover:text-accent"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
