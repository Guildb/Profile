import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import BackToTopButton from './components/BackToTopButton';
import ThemeToggleButton from './components/ThemeToggleButton';
import { ThemeProvider } from './contexts/ThemeContext';


const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation in milliseconds
    });
  }, []);

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
