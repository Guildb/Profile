import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

const BackToTopButton = () => {
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
          className="p-3 w-12 h-12 bg-gray-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
