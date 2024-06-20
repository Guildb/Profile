import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { useTheme } from '../contexts/ThemeContext';


const BackToTopButton = () => {
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 1000, // Duration in milliseconds
      smooth: 'easeInOutQuad'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`p-3 w-12 h-12 rounded-full shadow-lg focus:outline-none ${darkMode ? 'text-slate bg-gray-200 hover:bg-blue-200' : 'text-white bg-gray-600 hover:bg-blue-800'}`}
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
