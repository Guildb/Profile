import React, { useEffect, useRef } from 'react';
import * as motionReact from 'motion/react';
import useActiveSection from '../hooks/useActiveSection';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
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
  const prefersReduced = usePrefersReducedMotion();
  const scrollerRef = useRef(null);

  // On narrow screens the pill scrolls horizontally, so the active item can
  // sit outside it. Scroll the pill itself (never the window, which may be
  // mid smooth-scroll to an anchor) to bring the active item into view.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    const item = scroller.querySelector(`[href="#${activeId}"]`);
    if (!item) return;
    const target = item.offsetLeft - (scroller.clientWidth - item.offsetWidth) / 2;
    scroller.scrollTo({ left: target, behavior: prefersReduced ? 'auto' : 'smooth' });
  }, [activeId, prefersReduced]);

  return (
    // pt-4 aligns the 44px pill with the fixed theme toggle (top-4, h-11), so
    // the header is 68px tall at every width. On phones the right padding
    // keeps the pill clear of that toggle, and the pill scrolls sideways
    // instead of wrapping onto extra rows.
    <header className="fixed left-0 top-0 z-40 w-full pb-2 pr-16 pt-4 sm:pr-0">
      <nav aria-label="Primary" className="container mx-auto flex justify-center px-4">
        <div
          ref={scrollerRef}
          className="scrollbar-none flex h-11 min-w-0 max-w-full items-center gap-1 overflow-x-auto overscroll-x-contain rounded-full border border-hairline bg-surface px-1 text-ink shadow-lg backdrop-blur-md dark:bg-canvas/70 dark:shadow-black/40"
        >
          {navItems.map(({ to, label }) => {
            const isActive = activeId === to;
            return (
              <a
                key={to}
                href={`#${to}`}
                aria-current={isActive ? 'location' : undefined}
                className="relative shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink hover:text-accent focus-visible:outline-offset-[-2px]"
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
