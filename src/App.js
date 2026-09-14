import React from 'react';
import * as motionReact from 'motion/react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import BackToTopButton from './components/BackToTopButton';
import ThemeToggleButton from './components/ThemeToggleButton';
import Footer from './components/Footer';
import ScrollRail from './components/ui/ScrollRail';
import Grain from './components/ui/Grain';
import { ThemeProvider } from './contexts/ThemeContext';

const { MotionConfig } = motionReact;

// hero + the six sections rendered by Profile.js.
const SECTION_COUNT = 7;

// "user" mode makes every Framer Motion animation in the tree (including
// layoutId crossfades and whileHover springs that have no manual
// usePrefersReducedMotion guard, e.g. the nav indicator and the Interests
// icon wobble) respect the OS reduced-motion setting automatically.
const App = () => (
  <MotionConfig reducedMotion="user">
    <ThemeProvider>
      <Header />
      <LandingPage />
      <Profile />
      <Footer />
      <Grain />
      <ScrollRail sectionCount={SECTION_COUNT} />
      <BackToTopButton />
      <ThemeToggleButton />
    </ThemeProvider>
  </MotionConfig>
);

export default App;
