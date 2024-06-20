import React from 'react';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import BackToTopButton from './components/BackToTopButton';
import ThemeToggleButton from './components/ThemeToggleButton';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  

  return (
    <ThemeProvider>
      <div>
        <LandingPage />
        <Profile />
        <BackToTopButton />
        <ThemeToggleButton />
      </div>
    </ThemeProvider>
  );
};

export default App;
