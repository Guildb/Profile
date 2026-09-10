import React from 'react';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import BackToTopButton from './components/BackToTopButton';
import ThemeToggleButton from './components/ThemeToggleButton';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => (
  <ThemeProvider>
    <LandingPage />
    <Profile />
    <BackToTopButton />
    <ThemeToggleButton />
    <Footer />
  </ThemeProvider>
);

export default App;
