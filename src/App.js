import React from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import BackToTopButton from './components/BackToTopButton';
import ThemeToggleButton from './components/ThemeToggleButton';
import Footer from './components/Footer';
import ScrollRail from './components/ui/ScrollRail';
import Grain from './components/ui/Grain';
import { ThemeProvider } from './contexts/ThemeContext';

// hero + the six sections rendered by Profile.js.
const SECTION_COUNT = 7;

const App = () => (
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
);

export default App;
