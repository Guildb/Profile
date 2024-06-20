import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const useBodyBackground = () => {
  const { darkMode } = useTheme();

  useEffect(() => {
    document.body.style.backgroundImage = `url(${darkMode ? '/dark-pattern.svg' : '/light-pattern.svg'})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }, [darkMode]);
};

export default useBodyBackground;
